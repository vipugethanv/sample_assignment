import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text } from "rebass";
import { Input } from "@rebass/forms";


const loginSuccessCode = 200;
const loginFailCode = 400;

function Signup() {
  const [username, setName] = useState("");
  const [userpass, setPass] = useState("");
  const navigation = useNavigate();

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
    }).then(async (response) => {
      console.log("response" , response.status)
      if (response.status === loginFailCode) {
        alert("Login Failed");
      } else if (response.status === loginSuccessCode) {
        const data = await response.json();
        //console.log(data);
        navigation("/Dashboard", {
          state: {
            username: data.username,
          },
        });
      }
    });
  };

  return (
    <Box className="centre">
      <h1>Login to pick a Challenge</h1>

      <form onSubmit={handleSubmit} data-testid="login-form">
        <Box className="loginpage">
          <Text>Username </Text>
          <Input
            id="username"
            data-testid="userField"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </Box>

        <Box className="loginpage">
          <Text>Password </Text>
          <Input
            id="userpass"
            data-testid="passField"
            type="password"
            onChange={(event) => setPass(event.target.value)}
          />
        </Box>

        <Box>
          <Button
            variant="primary"
            type="submit"
            data-testid="submit_btn"
            color="black"
            disabled={!username || !userpass}
          >
            Login
          </Button>
        </Box>

        <br />
        <br />
      </form>
    </Box>
  );
}

export default Signup;
