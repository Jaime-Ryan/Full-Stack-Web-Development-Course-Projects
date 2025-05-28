import React from "react";

function Header() {
  return (
    <header style={{
      backgroundColor: "#282c34",
      padding: "20px",
      color: "white",
      marginBottom: "20px"
    }}>
      <h1 style={{ margin: 0 }}>React Components Practice</h1>
      <p style={{ margin: "10px 0 0 0", opacity: 0.8 }}>
        Updated to React 19.1.0 with Modern Component Architecture
      </p>
    </header>
  );
}

export default Header; 