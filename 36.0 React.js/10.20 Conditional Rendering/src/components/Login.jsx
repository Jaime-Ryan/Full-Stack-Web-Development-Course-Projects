import React, { useState } from "react";
import Input from "./Input";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simple validation - in real app, you'd validate credentials against a server
    if (formData.username && formData.password) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter both username and password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ username: "", password: "" });
  };

  // Conditional rendering - show different content based on login state
  if (isLoggedIn) {
    return (
      <div className="container">
        <h1>Welcome, {formData.username}!</h1>
        <p>You are successfully logged in.</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login; 