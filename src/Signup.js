import React from "react";
import { useState } from "react";
import { Box, Button, Heading, Text } from "rebass";
import { Input } from "@rebass/forms";
//import { buttonStyles,inputStyles } from "./Theme";

const loginSuccessCode = 200;
const loginFailCode = 400;

function Signup() {
  // Declared state variables "username" and "userpass" and their setters "setName" and "setPass"
  const [username, setName] = useState("");
  const [userpass, setPass] = useState("");

  // Function called when the form is submitted
  const handleSubmit = (event) => {
    // Prevent the default form submit behavior
    event.preventDefault();
    // console.log(`Username : ${username}`);
    // console.log(`Password : ${userpass}`);
  };
  console.log("Rendering...");


  
  return (
    <Box className="centre">
      <Heading>Login to pick a Challenge</Heading>

      <form onSubmit={handleSubmit}>
        <Box className="loginpage">
          <Text>Username </Text>
          <Input
            sx={{
              width: "250px",
            }}
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
          <Button variant = "primary" type="submit" id="submit_Btn">
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