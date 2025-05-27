import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greeting;
  let color;
  
  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good Morning";
    color = "red";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
    color = "green";
  } else {
    greeting = "Good Evening";
    color = "blue";
  }
  
  return (
    <div>
      <h1 className="heading" style={{ color: color }}>
        {greeting}
      </h1>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
