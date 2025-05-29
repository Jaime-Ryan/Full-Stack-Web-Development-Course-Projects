# Keeper Notes App - React 19 Edition

A Google Keep clone built with React 19, featuring modern React patterns and best practices.

## Features

- **React 19**: Updated to the latest stable version of React
- **Modern React Patterns**: Uses hooks (useState), destructured props, and functional components
- **Dynamic Note Rendering**: Renders all notes from the notes.js data file
- **Interactive Delete**: Click the ✖ button to delete notes
- **Google Keep Styling**: Clean, modern UI inspired by Google Keep
- **Responsive Design**: Notes display in a card layout

## Technologies Used

- React 19.0.0
- React DOM 19.0.0
- Vite (for fast development)
- Modern ES6+ JavaScript
- CSS3 with Google Fonts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── App.jsx          # Main app component with state management
│   ├── Header.jsx       # App header
│   ├── Footer.jsx       # App footer
│   └── Note.jsx         # Individual note component
├── notes.js             # Sample notes data
└── index.jsx            # App entry point with React 19 createRoot
```

## Key Updates from Previous Versions

- **React 19 Compatibility**: Updated all dependencies to React 19
- **Modern createRoot API**: Replaced deprecated ReactDOM.render
- **State Management**: Added useState hook for managing notes
- **Component Props**: Proper prop passing and destructuring
- **Event Handling**: Delete functionality with proper event handlers
- **ES6 Modules**: Proper import/export statements

## Features Demonstrated

- Component composition and reusability
- State management with React hooks
- Event handling and prop drilling
- Array mapping and key props
- Modern React development patterns
- Clean, maintainable code structure

## Future Enhancements

- Add new note creation
- Edit existing notes
- Local storage persistence
- Search and filter functionality
- Categories and tags
- Drag and drop reordering 