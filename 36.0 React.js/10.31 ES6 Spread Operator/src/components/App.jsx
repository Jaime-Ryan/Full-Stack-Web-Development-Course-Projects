import React, { useState, useTransition } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });
  
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    // Form inputs should be synchronous for immediate feedback
    setContact(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Form submission is a good use case for transitions
    startTransition(() => {
      // Simulate form submission
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      
      {submitted && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#d4edda", 
          color: "#155724", 
          marginBottom: "10px",
          borderRadius: "4px"
        }}>
          Form submitted successfully! ✅
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="fName"
          value={contact.fName}
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          name="lName"
          value={contact.lName}
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          name="email"
          value={contact.email}
          placeholder="Email"
          type="email"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Processing..." : "Submit"}
        </button>
      </form>
      
      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        ⚡ Powered by React 19 with useTransition for smooth form submission
      </div>
    </div>
  );
}

export default App;
