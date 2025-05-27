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

const img = "https://picsum.photos/200"

function App() {
  return (
    <div>
      <h1 class = "heading"  contentEditable = "true" spellCheck = "false">My Favorite Foxes</h1>
      <ul>
        <li><img src = {img} /></li>
        <li><img src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=300&h=200&fit=crop" alt="Red fox in nature" className="fox-image" /></li>
        <li><img src="https://naturecanada.ca/wp-content/uploads/2022/01/January-2022-3.png" alt="Orange fox portrait" className="fox-image" /></li>
        <li><img src="https://yukonwildlife.ca/wp-content/uploads/2020/05/MG_8647-YWP-Jake-PalecznyBanner-scaled.jpg" alt="Fox in snow" className="fox-image" /></li>
      </ul>
    </div>
  );
}

// Modern React 19 way to render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
