import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// React 19 uses createRoot instead of ReactDOM.render
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// Map/Filter/Reduce demonstration examples:

var numbers = [3, 56, 2, 48, 5];

// Map - Create a new array by doing something with each item in an array.
const doubled = numbers.map(x => x * 2);
console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubled);

// Filter - Create a new array by keeping the items that return true.
const evenNumbers = numbers.filter(x => x % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Reduce - Accumulate a value by doing something to each item in an array.
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Sum of numbers:", sum);

// Find - find the first item that matches from an array.
const firstLargeNumber = numbers.find(x => x > 10);
console.log("First number > 10:", firstLargeNumber);

// FindIndex - find the index of the first item that matches.
const indexOfFirstLargeNumber = numbers.findIndex(x => x > 10);
console.log("Index of first number > 10:", indexOfFirstLargeNumber);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
