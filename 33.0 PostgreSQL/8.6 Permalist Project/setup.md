# Permalist Project Setup Guide

## Database Setup

1. **Install PostgreSQL** if you haven't already
2. **Create a database** called `permalist`:
   ```sql
   CREATE DATABASE permalist;
   ```

3. **Connect to the database** and run the queries from `queries.sql`:
   ```sql
   \c permalist
   
   CREATE TABLE items (
     id SERIAL PRIMARY KEY,
     title VARCHAR(100) NOT NULL
   );
   
   INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework');
   ```

## Configuration

Update the database connection settings in `index.js` (lines 8-14) with your PostgreSQL credentials:

```javascript
const db = new pg.Client({
  user: "your_username",        // Usually "postgres"
  host: "localhost",
  database: "permalist",        // Database name
  password: "your_password",    // Your PostgreSQL password
  port: 5432,
});
```

## Running the Application

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Open your browser to `http://localhost:3000`

## Features

- ✅ **Add items**: Type in the input field and click "+"
- ✅ **Edit items**: Click the pencil icon, edit the text, and click the checkmark
- ✅ **Delete items**: Click the checkbox to delete an item
- ✅ **Persistent storage**: All changes are saved to PostgreSQL database 