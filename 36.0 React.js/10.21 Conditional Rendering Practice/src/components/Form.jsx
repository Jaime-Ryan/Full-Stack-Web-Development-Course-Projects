import React from "react";

function Form(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      
      {/* Only show Confirm Password input if user is NOT registered */}
      {!props.isRegistered && (
        <input type="password" placeholder="Confirm Password" />
      )}
      
      {/* Show Login button if registered, Register button if not registered */}
      <button type="submit">
        {props.isRegistered ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default Form;
