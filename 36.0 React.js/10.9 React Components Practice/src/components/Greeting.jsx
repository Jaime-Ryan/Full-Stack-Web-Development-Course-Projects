import React, { useState, useEffect } from "react";

function Greeting() {
  const [greeting, setGreeting] = useState("");
  const [customStyle, setCustomStyle] = useState({ color: "" });

  useEffect(() => {
    const date = new Date();
    const currentTime = date.getHours();

    if (currentTime < 12) {
      setGreeting("Good Morning");
      setCustomStyle({ color: "red" });
    } else if (currentTime < 18) {
      setGreeting("Good Afternoon");
      setCustomStyle({ color: "green" });
    } else {
      setGreeting("Good Night");
      setCustomStyle({ color: "blue" });
    }
  }, []);

  return (
    <h1 className="heading" style={customStyle}>
      {greeting}
    </h1>
  );
}

export default Greeting; 