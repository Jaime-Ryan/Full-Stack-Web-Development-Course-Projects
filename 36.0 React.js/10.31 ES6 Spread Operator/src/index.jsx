import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// const citrus = ["Lime", "Lemon", "Orange"];
// const fruits = ["Apple", ...citrus, "Banana", "Coconut"];

// const fullName = {
//   fName: "James",
//   lName: "Bond"
// };

// const user = {
//   ...fullName,
//   id: 1,
//   username: "jamesbond007"
// };

// console.log(user);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
