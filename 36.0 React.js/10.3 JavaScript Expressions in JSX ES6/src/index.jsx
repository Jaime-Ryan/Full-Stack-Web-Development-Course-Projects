import React from "react";
import { createRoot } from "react-dom/client";
import { React19Demo } from "./React19Demo.jsx";

// Modern React 19 component using latest features
function App() {
  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <h1 style={{ 
        color: "white", 
        fontSize: "3rem", 
        marginBottom: "1rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
      }}>
        🚀 React 19 Project
      </h1>
      <p style={{ 
        color: "white", 
        fontSize: "1.2rem", 
        maxWidth: "600px",
        lineHeight: "1.6",
        textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
      }}>
        Your project is now running on React 19 - the latest stable version! 
        This includes all the newest features like Actions, Server Components support, 
        improved performance, and enhanced developer experience.
      </p>
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: "10px",
        backdropFilter: "blur(10px)"
      }}>
        <h3 style={{ color: "white", marginBottom: "1rem" }}>✨ React 19 Features Available:</h3>
        <ul style={{ 
          color: "white", 
          textAlign: "left", 
          listStyle: "none", 
          padding: 0 
        }}>
          <li>🎯 Actions for form handling</li>
          <li>🔄 useActionState hook</li>
          <li>⚡ useOptimistic hook</li>
          <li>🎪 use() API for promises and context</li>
          <li>🖥️ Server Components support</li>
          <li>📝 Ref as prop (no more forwardRef needed)</li>
          <li>🎨 Document metadata support</li>
          <li>🚀 Improved performance and error handling</li>
        </ul>
      </div>
      
      {/* Include the interactive demo */}
      <React19Demo />
    </div>
  );
}

// Create root and render the app using React 19's createRoot API
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Development commands for your reference:
// npm install - to install dependencies
// npm run dev - to start the development server
// npm run build - to build for production
// npm run preview - to preview the production build
