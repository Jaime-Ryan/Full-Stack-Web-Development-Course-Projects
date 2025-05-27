import React from "react";
import { createRoot } from "react-dom/client";

const name = "Jaime";
const currentDate = new Date();
const year = currentDate.getFullYear();


const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <p>Created by {name}</p>
    <p>Copyright {year}</p>
  </div>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
