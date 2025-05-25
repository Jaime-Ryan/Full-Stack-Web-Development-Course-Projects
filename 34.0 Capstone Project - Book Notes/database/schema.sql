-- Book Notes Database Schema
-- Run this script to set up your PostgreSQL database

-- Create the database (run this separately if needed)
-- CREATE DATABASE book_notes;

-- Connect to the book_notes database before running the rest

-- Create books table
CREATE TABLE IF NOT EXISTS books (
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

-- Create an index on rating for faster sorting
CREATE INDEX IF NOT EXISTS idx_books_rating ON books(rating DESC);

-- Create an index on date_read for faster sorting
CREATE INDEX IF NOT EXISTS idx_books_date_read ON books(date_read DESC);

-- Create an index on title for faster sorting
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);

-- Insert some sample data (optional - remove if you want to start with empty database)
INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES
('The Lean Startup', 'Eric Ries', '9780307887894', 9, 'Excellent book about building startups with validated learning. The Build-Measure-Learn feedback loop is a game changer for product development.', '2024-01-15'),
('Atomic Habits', 'James Clear', '9780735211292', 10, 'Life-changing book about the power of small habits. The 1% better every day concept is simple but profound. Highly recommend for anyone looking to improve their life.', '2024-02-20'),
('The Psychology of Money', 'Morgan Housel', '9780857197689', 8, 'Great insights into how psychology affects our financial decisions. The stories are engaging and the lessons are practical.', '2024-03-10'),
('Sapiens', 'Yuval Noah Harari', '9780062316097', 9, 'Fascinating look at human history and how we became the dominant species. Makes you think differently about civilization and progress.', '2024-01-05'),
('The Pragmatic Programmer', 'David Thomas', '9780201616224', 8, 'Essential reading for any software developer. Timeless advice that remains relevant despite being written years ago.', '2023-12-15');

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at when a row is modified
CREATE TRIGGER update_books_updated_at 
    BEFORE UPDATE ON books 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 