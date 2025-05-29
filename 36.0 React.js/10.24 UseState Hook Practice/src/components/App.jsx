import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    
    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
