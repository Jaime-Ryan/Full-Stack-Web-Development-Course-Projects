const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { Pool } = require('pg');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'book_notes',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper function to get book cover URL
function getBookCoverUrl(isbn) {
  if (!isbn) return '/images/default-book-cover.svg';
  // Clean ISBN (remove hyphens and spaces)
  const cleanIsbn = isbn.replace(/[-\s]/g, '');
  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
}

// Helper function to format date
function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Routes

// Home page - display all books with sorting
app.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sort || 'date_read';
    let orderBy = 'date_read DESC';
    
    switch (sortBy) {
      case 'rating':
        orderBy = 'rating DESC, title ASC';
        break;
      case 'title':
        orderBy = 'title ASC';
        break;
      case 'date_read':
        orderBy = 'date_read DESC, title ASC';
        break;
      case 'author':
        orderBy = 'author ASC, title ASC';
        break;
    }

    const result = await pool.query(`
      SELECT * FROM books 
      ORDER BY ${orderBy}
    `);
    
    const books = result.rows.map(book => ({
      ...book,
      cover_url: getBookCoverUrl(book.isbn),
      formatted_date: formatDate(book.date_read),
      rating_stars: '★'.repeat(book.rating || 0) + '☆'.repeat(10 - (book.rating || 0))
    }));

    res.render('index', { 
      books, 
      currentSort: sortBy,
      title: 'My Book Collection'
    });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).render('error', { 
      message: 'Error loading books',
      error: err 
    });
  }
});

// Add book page
app.get('/add', (req, res) => {
  res.render('add-book', { 
    title: 'Add New Book',
    book: {} // Empty book object for form
  });
});

// Create new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, isbn, rating, notes, date_read } = req.body;
    
    // Validate required fields
    if (!title || !author) {
      return res.status(400).render('add-book', {
        title: 'Add New Book',
        book: req.body,
        error: 'Title and author are required'
      });
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 10)) {
      return res.status(400).render('add-book', {
        title: 'Add New Book',
        book: req.body,
        error: 'Rating must be between 1 and 10'
      });
    }

    const result = await pool.query(
      `INSERT INTO books (title, author, isbn, rating, notes, date_read) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [title, author, isbn || null, rating || null, notes || null, date_read || null]
    );

    console.log(`Book added successfully with ID: ${result.rows[0].id}`);
    res.redirect('/');
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).render('add-book', {
      title: 'Add New Book',
      book: req.body,
      error: 'Error adding book to database'
    });
  }
});

// Edit book page
app.get('/books/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).render('error', {
        message: 'Book not found',
        error: { status: 404 }
      });
    }

    const book = result.rows[0];
    // Format date for input field
    if (book.date_read) {
      book.date_read = new Date(book.date_read).toISOString().split('T')[0];
    }

    res.render('edit-book', { 
      title: 'Edit Book',
      book 
    });
  } catch (err) {
    console.error('Error fetching book for edit:', err);
    res.status(500).render('error', {
      message: 'Error loading book',
      error: err
    });
  }
});

// Update book
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, rating, notes, date_read } = req.body;
    
    // Validate required fields
    if (!title || !author) {
      const book = { id, ...req.body };
      return res.status(400).render('edit-book', {
        title: 'Edit Book',
        book,
        error: 'Title and author are required'
      });
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 10)) {
      const book = { id, ...req.body };
      return res.status(400).render('edit-book', {
        title: 'Edit Book',
        book,
        error: 'Rating must be between 1 and 10'
      });
    }

    const result = await pool.query(
      `UPDATE books 
       SET title = $1, author = $2, isbn = $3, rating = $4, notes = $5, date_read = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7`,
      [title, author, isbn || null, rating || null, notes || null, date_read || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).render('error', {
        message: 'Book not found',
        error: { status: 404 }
      });
    }

    console.log(`Book updated successfully: ${title}`);
    res.redirect('/');
  } catch (err) {
    console.error('Error updating book:', err);
    const book = { id: req.params.id, ...req.body };
    res.status(500).render('edit-book', {
      title: 'Edit Book',
      book,
      error: 'Error updating book in database'
    });
  }
});

// Delete book
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    console.log(`Book deleted successfully: ID ${id}`);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Error deleting book from database' });
  }
});

// API endpoint to check if book cover exists
app.get('/api/check-cover/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    const cleanIsbn = isbn.replace(/[-\s]/g, '');
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
    
    // Check if cover exists by making a HEAD request
    const response = await axios.head(coverUrl);
    res.json({ exists: response.status === 200, url: coverUrl });
  } catch (err) {
    res.json({ exists: false, url: '/images/default-book-cover.svg' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).render('error', {
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page not found',
    error: { status: 404 }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Book Notes app listening at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 