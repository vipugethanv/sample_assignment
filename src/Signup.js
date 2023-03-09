import React from "react";
import { useState } from "react";
import { Box, Button, Heading, Text } from "rebass";
import { Input } from "@rebass/forms";
//import "../src/Signup.css"
const loginSuccessCode = 200;
const loginFailCode = 400;

function Signup() {

  const [username, setName] = useState("");
  const [userpass, setPass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const SignupEndpoint = "http://localhost:3000/user-service/login";

    const loginData = {
      loginName: username,
      loginPassword: userpass,

    };
    fetch(SignupEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  

      });

    
  };

  return (
    <Box className="centre">
      <Heading>Login to pick a Challenge</Heading>

      <form onSubmit={handleSubmit}>
        <Box className="loginpage">
          <Text>Username </Text>
          <Input
            id="username"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </Box>

        <Box className="loginpage">
          <Text>Password </Text>
          <Input
            // sx = {{...inputStyles}}
            id="userpass"
            type="password"
            onChange={(event) => setPass(event.target.value)}
          />
        </Box>

        <Box>
          <Button variant="primary" type="submit" id="submit_Btn" color="black">
            Login
          </Button>
        </Box>

        <br></br>
        <br></br>
      </form>
    </Box>
  );
}

export default Signup;
// const buttonStyles = {
//   color : "red",
//   bg : "black"

// }
