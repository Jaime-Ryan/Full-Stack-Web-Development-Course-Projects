import React, { useState } from "react";
import Form from "./Form";

function App() {
  // Using state instead of a static variable so we can toggle it
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  
  const toggleRegistration = () => {
    setUserIsRegistered(!userIsRegistered);
  };

  return (
    <div className="container">
      <h1>
        {userIsRegistered ? "Welcome Back!" : "Create Your Account"}
      </h1>
      <Form isRegistered={userIsRegistered} />
      <hr />
      <button onClick={toggleRegistration} style={{ marginTop: "20px" }}>
        {userIsRegistered 
          ? "Need to register? Click here" 
          : "Already have an account? Click here"}
      </button>
    </div>
  );
}

export default App;
