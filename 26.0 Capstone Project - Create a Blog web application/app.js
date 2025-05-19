// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { gsap } from 'gsap';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express application instance
const app = express();

// Configure EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize an empty array to store blog posts in memory
let posts = [];

// Public Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/blog', (req, res) => {
    const sortedPosts = [...posts].sort((a, b) => b.date - a.date);
    res.render('index', { posts: sortedPosts });
});

app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.redirect('/');
    res.render('post', { post });
});

// Admin Routes
app.get('/admin', (req, res) => {
    const sortedPosts = [...posts].sort((a, b) => b.date - a.date);
    res.render('admin-dashboard', { posts: sortedPosts });
});

app.get('/admin/dashboard', (req, res) => {
    const sortedPosts = [...posts].sort((a, b) => b.date - a.date);
    res.render('admin-dashboard', { posts: sortedPosts });
});

app.get('/admin/create', (req, res) => {
    res.render('create');
});

app.post('/admin/create', (req, res) => {
    const { title, content } = req.body;
    const id = Date.now().toString();
    const preview = content.length > 150 ? content.substring(0, 150) + '...' : content;
    posts.push({ id, title, content, preview, date: new Date() });
    res.redirect('/admin/dashboard');
});

app.get('/admin/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.redirect('/admin/dashboard');
    res.render('edit', { post });
});

app.post('/admin/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        const preview = content.length > 150 ? content.substring(0, 150) + '...' : content;
        posts[index] = { ...posts[index], title, content, preview };
    }
    res.redirect('/admin/dashboard');
});

app.post('/admin/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/admin/dashboard');
});

// Set port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
