import React from "react";
import Header from "./Header";
import Greeting from "./Greeting";
import TimeDisplay from "./TimeDisplay";

function App() {
  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <Header />
      <div style={{ 
        textAlign: "center", 
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}>
        <Greeting />
        <TimeDisplay />
      </div>
    </div>
  );
}

export default App; 