import React from "react";
import { createRoot } from "react-dom/client";
import { cars } from "./practice.js";

// ES6 Destructuring Challenge: Extract car data using destructuring
const [honda, tesla] = cars;

// Destructure Honda car data
const { 
  model: hondaModel, 
  coloursByPopularity: [hondaTopColour], 
  speedStats: { topSpeed: hondaTopSpeed } 
} = honda;

// Destructure Tesla car data  
const { 
  model: teslaModel, 
  coloursByPopularity: [teslaTopColour], 
  speedStats: { topSpeed: teslaTopSpeed } 
} = tesla;

// Create root container
const container = document.getElementById("root");
const root = createRoot(container);

// Render the component using React 19's createRoot API
root.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Color</th>
    </tr>
    <tr>
      <td>{teslaModel}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{hondaModel}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>
);
