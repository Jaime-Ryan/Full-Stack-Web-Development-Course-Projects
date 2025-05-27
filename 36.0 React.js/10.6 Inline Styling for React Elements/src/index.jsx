import React from "react";
import { createRoot } from "react-dom/client";

// Fancy inline styles object
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "20px",
  boxSizing: "border-box"
};

const headingStyle = {
  fontSize: "4rem",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb,rgb(159, 255, 180))",
  backgroundSize: "400% 400%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gradientShift 3s ease-in-out infinite",
  textAlign: "center",
  margin: "0 0 30px 0",
  textShadow: "0 4px 8px rgba(0,0,0,0.3)",
  letterSpacing: "2px"
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transform: "translateY(0)",
  transition: "all 0.3s ease",
  maxWidth: "600px",
  width: "100%"
};

const subHeadingStyle = {
  fontSize: "1.5rem",
  color: "#ffffff",
  textAlign: "center",
  marginBottom: "20px",
  opacity: "0.9",
  fontWeight: "300"
};

const buttonStyle = {
  background: "linear-gradient(45deg, #ff6b6b, #feca57)",
  border: "none",
  borderRadius: "50px",
  padding: "15px 30px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "10px"
};

// Add some CSS keyframes for animations (we'll inject this into the document)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .fancy-card:hover {
    transform: translateY(-10px) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4) !important;
  }
  
  .fancy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
  }
  
  .fancy-button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

function App() {
  const handleButtonClick = () => {
    alert("🎉 Fancy styling in action! 🎉");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Fancy React Styling!</h1>
      <div style={cardStyle} className="fancy-card">
        <h2 style={subHeadingStyle}>Welcome to Inline Styling Magic ✨</h2>
        <p style={{
          color: "#ffffff",
          fontSize: "1.1rem",
          lineHeight: "1.6",
          textAlign: "center",
          marginBottom: "30px",
          opacity: "0.8"
        }}>
          This demonstrates advanced inline styling with gradients, glassmorphism effects, 
          animations, and modern CSS properties all applied directly in React!
        </p>
        <div style={{ textAlign: "center" }}>
          <button 
            style={buttonStyle} 
            className="fancy-button"
            onClick={handleButtonClick}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(45deg, #feca57, #ff6b6b)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(45deg, #ff6b6b, #feca57)";
            }}
          >
            Click Me!
          </button>
          <button 
            style={{
              ...buttonStyle,
              background: "linear-gradient(45deg, #48dbfb, #0abde3)",
              boxShadow: "0 4px 15px rgba(72, 219, 251, 0.4)"
            }} 
            className="fancy-button"
            onClick={() => alert("🌊 Another fancy button! 🌊")}
          >
            Or Me!
          </button>
        </div>
      </div>
    </div>
  );
}

// Modern React 19 way to render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
