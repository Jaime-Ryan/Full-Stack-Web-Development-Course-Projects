import React from "react";
import { createRoot } from "react-dom/client";
import pi from "./math.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>Pi: {pi}</li>
  </ul>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
