# React To-Do List - Component Tree Practice

A React application demonstrating component tree management with a to-do list interface.

## Recent Updates

This project has been updated to **React 19.1.0** (latest stable version as of March 2025) from React 17.0.2.

### Key Changes Made:

1. **React & React DOM**: Updated to version 19.1.0
2. **Entry Point**: Updated `src/index.jsx` to use the new `createRoot` API instead of the deprecated `ReactDOM.render`
3. **Dependencies**: Updated all dependencies to their latest compatible versions
4. **ESLint**: Updated to version 9 with React Hooks ESLint plugin 5.0.0

### New React 19 Features Available:

- **Actions**: `startTransition` can now accept async functions
- **New Hooks**: `useActionState`, `useOptimistic`, and `use`
- **ref as prop**: No longer need `forwardRef` for function components
- **Enhanced Suspense**: Better support for server-side rendering and hydration
- **Document metadata support**: Native support for `<title>`, `<meta>`, and `<link>` tags
- **Stylesheet and script support**: Better handling of CSS and async scripts

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL (usually `http://localhost:5173`)

## Project Structure

```
src/
├── components/
│   ├── App.jsx          # Main application component
│   ├── InputArea.jsx    # Input form component
│   └── ToDoItem.jsx     # Individual to-do item component
└── index.jsx            # Application entry point
```

## Features

- Add new to-do items
- Delete to-do items by clicking on them
- State management across component tree
- Clean component separation and props passing

## Technologies

- React 19.1.0
- Vite 6.0.5
- ESLint 9.17.0
- Modern JavaScript (ES6+)

## Learning Objectives

This project demonstrates:
- Component tree management
- State lifting and props passing
- Event handling across components
- Modern React patterns and best practices 