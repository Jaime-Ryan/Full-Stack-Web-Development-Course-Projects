import React from 'react';
import { createRoot } from 'react-dom/client';

// Create a react app from scratch.
// It should display a h1 heading.
// It should display an unordered list (bullet points).
// It should contain 3 list elements.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

function App() {
  return (
    <div>
      <h1>My Favorite Foods</h1>
      <ul>
        <li>Chicken Wings</li>
        <li>Pizza</li>
        <li>Beef Ribs</li>
        <li>Pad Thai</li>
        <li>Steak</li>
      </ul>
    </div>
  );
}

// Modern React 19 way to render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
