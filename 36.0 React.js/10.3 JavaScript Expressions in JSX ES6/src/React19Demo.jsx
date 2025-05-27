import React, { useState } from "react";

// React 19 Demo Component showcasing new features
export function React19Demo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // In React 19, we no longer need useCallback for simple functions
  // The React compiler automatically optimizes these
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Form action example (React 19 feature)
  const handleFormSubmit = async (formData) => {
    const inputValue = formData.get("message");
    setMessage(`You typed: ${inputValue}`);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(`Form submitted with: ${inputValue}`);
  };

  return (
    <div style={{
      padding: "2rem",
      margin: "2rem auto",
      maxWidth: "600px",
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: "15px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      backdropFilter: "blur(10px)"
    }}>
      <h2 style={{ 
        color: "#333", 
        marginBottom: "1.5rem",
        textAlign: "center"
      }}>
        🎮 React 19 Interactive Demo
      </h2>

      {/* Counter Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#555", marginBottom: "1rem" }}>Counter Example</h3>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: "1rem",
          marginBottom: "1rem"
        }}>
          <button 
            onClick={decrement}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            -
          </button>
          
          <span style={{ 
            fontSize: "2rem", 
            fontWeight: "bold", 
            color: "#333",
            minWidth: "3rem",
            textAlign: "center"
          }}>
            {count}
          </span>
          
          <button 
            onClick={increment}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#51cf66",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            +
          </button>
        </div>
        
        <button 
          onClick={reset}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#339af0",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "0.9rem",
            display: "block",
            margin: "0 auto"
          }}
        >
          Reset
        </button>
      </div>

      {/* Form Action Section (React 19 feature) */}
      <div>
        <h3 style={{ color: "#555", marginBottom: "1rem" }}>Form Actions (React 19)</h3>
        <form action={handleFormSubmit} style={{ marginBottom: "1rem" }}>
          <input
            name="message"
            type="text"
            placeholder="Type something..."
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e9ecef",
              borderRadius: "5px",
              fontSize: "1rem",
              marginBottom: "1rem",
              outline: "none",
              transition: "border-color 0.3s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "#339af0"}
            onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold"
            }}
          >
            Submit with React 19 Action
          </button>
        </form>
        
        {message && (
          <div style={{
            padding: "1rem",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
            color: "#155724"
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "5px",
        fontSize: "0.9rem",
        color: "#6c757d"
      }}>
        💡 <strong>React 19 Benefits:</strong> No need for useCallback or useMemo for simple cases - 
        the React compiler automatically optimizes your code!
      </div>
    </div>
  );
} 