# Keeper App - React 19 Version

A simple note-keeping application built with React 19, following modern best practices.

## Features

- **React 19**: Updated to the latest stable version of React
- **Modern Architecture**: Uses functional components with hooks
- **Responsive Design**: Clean, modern UI with CSS styling
- **Component-Based**: Modular structure with reusable components

## Project Structure

```
src/
├── components/
│   ├── Header.jsx      # App header with title
│   ├── Footer.jsx      # Footer with dynamic copyright year
│   └── Note.jsx        # Note display component
├── App.jsx             # Main application component
└── index.jsx           # Entry point with React 19 createRoot API
```

## Components

### Header
- Renders the app title "Keeper" in a styled header
- Uses semantic HTML `<header>` element

### Footer
- Displays copyright information with dynamically updated year
- Uses `new Date().getFullYear()` for current year

### Note
- Shows a sample note with title and content
- Styled with CSS classes from `styles.css`

### App
- Main component that orchestrates all other components
- Clean, simple structure following React 19 best practices

## React 19 Features Used

- **createRoot API**: Modern root rendering instead of deprecated ReactDOM.render
- **Functional Components**: All components use modern function syntax
- **ES6 Modules**: Proper import/export structure
- **Modern JSX**: Clean, readable component structure

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Styling

The app uses CSS classes defined in `public/styles.css`:
- `.note` - Individual note styling
- `header` - App header styling
- `footer` - Footer positioning and styling

## Best Practices Implemented

- ✅ Functional components over class components
- ✅ Modern React 19 createRoot API
- ✅ Semantic HTML elements
- ✅ Component separation and modularity
- ✅ Dynamic content (current year in footer)
- ✅ Clean import/export structure
- ✅ Consistent naming conventions

## Browser Support

This project uses React 19 and modern JavaScript features. Ensure your browser supports:
- ES6+ features
- Modern DOM APIs
- CSS Grid and Flexbox

## Development

Built with:
- React 19.0.0
- Vite (build tool)
- Modern JavaScript (ES6+)

## Live Demo

The final website should look like: https://l1pp6.csb.app/ 