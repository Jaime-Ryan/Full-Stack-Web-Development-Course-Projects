# Family Travel Tracker - Multi-User Implementation

## Overview
This Family Travel Tracker application now supports multiple users, allowing each family member to track their own visited countries with personalized colors on the world map.

## Features Implemented

### 1. Multi-User Database Schema
- **Users Table**: Stores user information (id, name, color)
- **Visited Countries Table**: Links countries to specific users via user_id foreign key
- **Proper Relationships**: Each visited country is associated with a specific user

### 2. Dynamic User Management
- **Database-Driven Users**: Users are now fetched from the PostgreSQL database instead of hardcoded arrays
- **User-Specific Data**: Each user sees only their own visited countries
- **Color Personalization**: Each user has their own color for the world map

### 3. Enhanced Functionality
- **User Switching**: Click on any user tab to switch between family members
- **Add New Users**: Click "Add Family Member" to create new users with custom names and colors
- **User-Specific Country Addition**: Countries are added only to the currently selected user
- **Persistent Data**: All data is stored in PostgreSQL database

## Database Schema

### Users Table
```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(15) UNIQUE NOT NULL,
  color VARCHAR(15)
);
```

### Visited Countries Table
```sql
CREATE TABLE visited_countries(
  id SERIAL PRIMARY KEY,
  country_code CHAR(2) NOT NULL,
  user_id INTEGER REFERENCES users(id)
);
```

## API Endpoints

### GET /
- Displays the main page with the current user's visited countries
- Shows all users in the tab navigation
- Uses the current user's color for the map

### POST /add
- Adds a new country to the currently selected user's visited list
- Validates country name against the countries database
- Redirects back to the main page

### POST /user
- Handles user switching and new user creation
- If "new" is selected, renders the new user form
- Otherwise, switches to the selected user

### POST /new
- Creates a new user with the provided name and color
- Uses PostgreSQL RETURNING clause to get the new user's ID
- Automatically switches to the newly created user

## Setup Instructions

1. **Database Setup**: Run the setup script to create tables and initial data
   ```bash
   node setup_database.js
   ```

2. **Start the Application**:
   ```bash
   node index.js
   ```

3. **Access the Application**: Visit `http://localhost:3000`

## Key Implementation Details

- **Current User Tracking**: The application maintains a `currentUserId` variable to track the active user
- **Database Queries**: All queries are parameterized to filter data by user_id
- **Error Handling**: Proper error handling with redirects to prevent crashes
- **User Experience**: Seamless switching between users without page reloads for navigation

## Testing
The implementation has been tested to ensure:
- Users can switch between different family members
- Each user sees only their own visited countries
- New users can be added successfully
- Countries are correctly associated with the current user
- Map colors change based on the selected user 