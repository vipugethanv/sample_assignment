import React from "react";
import { useState } from "react";
// Function to 'handleSubmit' to handle form submissions
const Signup = () => {
  const handleSubmit = (event) => {

  }

  return (
    <div className="centre">
      <h1>Login to pick a Challenge</h1>
      <form>
        <div className="loginpage">
          <label>Username </label>
          <input id="username" type="text" />
        </div>

        <div className="loginpage">
          <label>Password </label>
          <input id="userpassword" type="password" />
        </div>

        <button type="submit">Login </button>

        <br></br>
        <br></br>
      </form>
    </div>
  );
};

export default Signup;

