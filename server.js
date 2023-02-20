const express = require("express");
const app = express();
const port = 3000;
// Start the server
app.listen(port, () => {
console.log("Server Initiated");
});
const email = "admin@hello.world";
const password = "circles111";
// Route for handling login requests
app.post("/user-service/login", (request, respond) => {
  // Get the user's name and password from the request body
  const loginName = request.body.loginName;
  const loginPassword = request.body.loginPassword;

  // Check if the email and password match the hardcoded values
  if (email == loginName && password == loginPassword) {
    // If they match, respond with a success message and a token
    respond.send ({message: "login success",token: "a_guid"})
  } else {
    // If they don't match, respond with a failure message
    respond.send ({ message: "login failed" });
  }
});
