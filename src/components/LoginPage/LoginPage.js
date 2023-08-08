import React, { useContext, useState, useEffect } from "react";
import UserContext from '../Shared/UserContext';
import jwtDecode from "jwt-decode";
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginPage = ()=> {
  const { setUser, setToken } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Check for an existing token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = jwtDecode(token).userType;
      setUser({ role: userRole });
      navigate("/");
    }
  }, [navigate, setUser]);

  const handleLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.ok) {
      const { token: apiToken } = await response.json();
      localStorage.setItem('token', apiToken);
      setToken(apiToken);  // Set the token in the context
      const userRole = jwtDecode(apiToken).userType;
      setUser({ role: userRole });
      navigate("/");
    } else if (response.status === 400) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{backgroundColor: '#f2f2f2', height: '92vh'}}
    >
      <Box
        boxShadow={2}
        bgcolor="background.paper"
        p={2}
        borderRadius={2}
        maxWidth={400}
        style={{ width: '80vw'}}
      >
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <TextField 
          fullWidth 
          margin="normal" 
          label="Username" 
          variant="outlined" 
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          fullWidth 
          margin="normal" 
          label="Password" 
          type="password" 
          variant="outlined" 
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          onClick={handleLogin}
          style={{ marginTop: 16 }}
        >
          Login
        </Button>
        {errorMessage && <Typography color="error" style={{ marginTop: 8 }}>{errorMessage}</Typography>}
      </Box>
    </Box>
  );
};

export default LoginPage;
