import React, { useState, useEffect } from "react";

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="time-display" style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>Current Time</h2>
      <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
        {formatTime(currentTime)}
      </p>
    </div>
  );
}

export default TimeDisplay; 