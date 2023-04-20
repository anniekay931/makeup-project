import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import { TextField, Button, Grid, Paper, Typography, Container, Box } from '@mui/material';

function Login({ user, products }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User data", data.user);
      const accessToken = data.access_token;
      localStorage.setItem("accessToken", accessToken);
      setUser(data.user);
      history.push("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '2rem', backgroundColor: '#f5f5f5', borderRadius: '1rem', padding: '2rem' }}>
      <Typography variant="h4" align="center">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box my={2}>
          <TextField
            label="Username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
        </Box>
        <Box my={2}>
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
        </Box>
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Login;