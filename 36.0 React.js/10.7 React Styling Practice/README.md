# React Styling Practice - Updated to React 19.1.0

This project has been updated from React 17.0.2 to the latest React 19.1.0 version.

## Features

This React application displays a time-based greeting with dynamic styling:

- **Good Morning** (12:00 AM - 11:59 AM) - Red text
- **Good Afternoon** (12:00 PM - 5:59 PM) - Green text  
- **Good Evening** (6:00 PM - 11:59 PM) - Blue text

The greeting automatically updates based on the current time and applies both CSS class styling and inline color styling.

## What's Updated

### Dependencies Updated:
- React: `^17.0.2` → `^19.1.0`
- React DOM: `^17.0.2` → `^19.1.0`
- @types/react: `^18.2.56` → `^19.0.0`
- @types/react-dom: `^18.2.19` → `^19.0.0`
- eslint-plugin-react-hooks: `^4.6.0` → `^5.0.0`

### Code Updates:
- Updated to use `createRoot` from `react-dom/client` (React 18+ API)
- Implemented time-based greeting logic
- Applied dynamic inline styling for colors
- Used CSS class for base heading styles

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5174/`

## React 19.1.0 New Features

This project now uses React 19.1.0 which includes:
- Enhanced Suspense support
- Owner Stack for better debugging
- React DOM improvements
- React Server Components advancements
- Better error handling and performance improvements

## Project Structure

```
10.7 React Styling Practice/
├── public/
│   └── styles.css          # CSS styles with .heading class
├── src/
│   └── index.jsx          # Main React application
├── index.html             # HTML template
├── package.json           # Updated dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
``` 