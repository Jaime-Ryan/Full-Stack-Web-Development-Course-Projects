import React, { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Using useCallback for optimized performance (React 19 handles this better)
  const increase = useCallback(() => {
    setCount(prevCount => prevCount + step);
  }, [step]);

  const decrease = useCallback(() => {
    setCount(prevCount => prevCount - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const handleStepChange = useCallback((event) => {
    const newStep = parseInt(event.target.value) || 1;
    setStep(newStep);
  }, []);

  return (
    <div className="container">
      <h1>{count}</h1>
      
      <div className="controls">
        <button onClick={decrease} disabled={count <= 0 && step > 0}>
          -
        </button>
        <button onClick={increase}>
          +
        </button>
        <button onClick={reset} className="reset-btn">
          Reset
        </button>
      </div>

      <div className="step-control">
        <label htmlFor="step">Step: </label>
        <input 
          type="number" 
          id="step"
          value={step} 
          onChange={handleStepChange}
          min="1"
          max="10"
        />
      </div>

      <div className="info">
        <p>React 19.1.0 - useState Hook Demo</p>
        <p>Current count: {count}</p>
        <p>Step size: {step}</p>
      </div>
    </div>
  );
}

export default App;
