import { createRoot } from "react-dom/client";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// var numbers = [3, 56, 2, 48, 5];

////Map -Create a new array by doing something with each item in an array.
// ES6 Arrow Function version:
// const newNumbers = numbers.map(x => x * 2);

//////Filter - Create a new array by keeping the items that return true.
// ES6 Arrow Function version:
// const newNumbers = numbers.filter(num => num < 10);

//Reduce - Accumulate a value by doing something to each item in an array.
// ES6 Arrow Function version:
// var newNumber = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber);

////Find - find the first item that matches from an array.
// ES6 Arrow Function version:
// const newNumber = numbers.find(num => num > 10);

////FindIndex - find the index of the first item that matches.
// ES6 Arrow Function version:
// const newNumber = numbers.findIndex(num => num > 10);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
