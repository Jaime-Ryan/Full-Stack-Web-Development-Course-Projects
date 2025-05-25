# Book Notes Capstone Project

A web application to track and review books you've read, inspired by Derek Sivers' book collection at [sive.rs/book](https://sive.rs/book).

## Features

- 📚 Add books with title, author, ISBN, rating, and personal notes
- 🖼️ Automatic book cover fetching using Open Library Covers API
- ⭐ Rate books from 1-10 stars
- 📝 Write detailed notes and reviews
- 🔄 Sort books by rating, date read, or title
- ✏️ Edit and update book entries
- 🗑️ Delete books from your collection
- 📱 Responsive design for mobile and desktop

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS templating, HTML5, CSS3, JavaScript
- **API**: Open Library Covers API
- **Dependencies**: pg, axios, body-parser, method-override, dotenv

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- PostgreSQL installed and running
- npm or yarn package manager

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd book-notes-capstone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a new database called `book_notes`
   - Run the SQL commands in `database/schema.sql` to create the required tables

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the database connection details in `.env`

5. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`

## Database Schema

The application uses a single `books` table with the following structure:

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    date_read DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Integration

This project integrates with the Open Library Covers API to automatically fetch book covers:

- **API Endpoint**: `https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg`
- **Fallback**: Default placeholder image when cover is not available
- **Rate Limiting**: Respects API rate limits (100 requests per 5 minutes)

## Project Structure

```
book-notes-capstone/
├── public/
│   ├── css/
│   │   └── style.css
│   │   
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── default-book-cover.jpg
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── add-book.ejs
│   └── edit-book.ejs
├── database/
│   └── schema.sql
├── index.js
├── package.json
├── .env.example
└── README.md
```

## Usage

1. **Adding a Book**: Click "Add New Book" and fill in the details including ISBN for automatic cover fetching
2. **Viewing Books**: Browse your collection on the main page with cover images and ratings
3. **Sorting**: Use the sort dropdown to organize by rating, date read, or title
4. **Editing**: Click the edit button on any book to update its information
5. **Deleting**: Use the delete button to remove books from your collection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Derek Sivers' book collection at [sive.rs/book](https://sive.rs/book)
- Book covers provided by [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)
- Built as part of the Full-Stack Web Development Course capstone project 