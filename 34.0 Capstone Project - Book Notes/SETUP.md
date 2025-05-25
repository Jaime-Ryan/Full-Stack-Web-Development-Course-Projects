# Book Notes - Setup Guide

This guide will help you set up and run the Book Notes application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **PostgreSQL** (version 12 or higher)
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Verify installation: `psql --version`

3. **Git** (optional, for cloning)
   - Download from [git-scm.com](https://git-scm.com/)

## Step-by-Step Setup

### 1. Get the Project Files

If you have the project files, navigate to the project directory:
```bash
cd book-notes-capstone
```

### 2. Install Dependencies

Install all required Node.js packages:
```bash
npm install
```

### 3. Set Up PostgreSQL Database

#### Option A: Using psql command line
1. Open your terminal/command prompt
2. Connect to PostgreSQL:
   ```bash
   psql -U postgres
   ```
3. Create the database:
   ```sql
   CREATE DATABASE book_notes;
   ```
4. Exit psql:
   ```sql
   \q
   ```
5. Run the schema file:
   ```bash
   psql -U postgres -d book_notes -f database/schema.sql
   ```

#### Option B: Using pgAdmin (GUI)
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it `book_notes`
5. Open the Query Tool for the new database
6. Copy and paste the contents of `database/schema.sql`
7. Execute the script

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file with your database credentials:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=book_notes
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password

   # Server Configuration
   PORT=3000

   # Application Settings
   NODE_ENV=development
   ```

### 5. Test Database Connection

You can test if your database is set up correctly by running:
```bash
npm run dev
```

If you see "Connected to PostgreSQL database" in the console, you're good to go!

### 6. Start the Application

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

### 7. Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

## Troubleshooting

### Common Issues

#### Database Connection Error
- **Error**: "Error connecting to the database"
- **Solution**: 
  - Check if PostgreSQL is running
  - Verify your database credentials in `.env`
  - Ensure the `book_notes` database exists

#### Port Already in Use
- **Error**: "EADDRINUSE: address already in use :::3000"
- **Solution**: 
  - Change the PORT in your `.env` file to a different number (e.g., 3001)
  - Or stop the process using port 3000

#### Module Not Found
- **Error**: "Cannot find module..."
- **Solution**: Run `npm install` again

#### Permission Denied (PostgreSQL)
- **Error**: "permission denied for database"
- **Solution**: 
  - Make sure your PostgreSQL user has the correct permissions
  - Try using the `postgres` superuser account

### Database Reset

If you need to reset your database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Drop and recreate the database
DROP DATABASE book_notes;
CREATE DATABASE book_notes;
\q

# Run the schema again
psql -U postgres -d book_notes -f database/schema.sql
```

## Features Overview

Once running, you can:

1. **View Books**: See all your books on the home page
2. **Add Books**: Click "Add Book" to add new books with covers
3. **Edit Books**: Click the edit button on any book card
4. **Delete Books**: Use the delete button (with confirmation)
5. **Sort Books**: Use the dropdown to sort by rating, date, title, or author
6. **Book Covers**: Automatic fetching from Open Library API using ISBN

## Sample Data

The database schema includes sample books to get you started. You can:
- Remove them by deleting the INSERT statements in `database/schema.sql`
- Or delete them through the web interface

## API Integration

The app uses the Open Library Covers API:
- **Endpoint**: `https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg`
- **Rate Limit**: 100 requests per 5 minutes per IP
- **Fallback**: Custom SVG placeholder when covers aren't available

## Development Tips

1. **Auto-restart**: Use `npm run dev` for development with nodemon
2. **Database GUI**: Consider using pgAdmin or DBeaver for database management
3. **API Testing**: Use the browser's developer tools to debug API calls
4. **Logs**: Check the console for helpful error messages

## Next Steps

After setup, you might want to:
1. Add your own books
2. Customize the styling in `public/css/style.css`
3. Add more features like book categories or reading goals
4. Deploy to a cloud service like Heroku or Railway

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review the console logs for error messages
3. Ensure all prerequisites are properly installed
4. Verify your database connection and credentials

Happy reading and note-taking! 📚 