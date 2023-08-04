import React, { useContext, useState, useEffect } from "react";
import UserContext from '../Shared/UserContext';
import jwtDecode from "jwt-decode";
import { Button, TextField, Container, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    const response = await fetch('http://localhost:8000/login', {
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
      const { token } = await response.json();
      localStorage.setItem('token', token);
      const userRole = jwtDecode(token).userType;
      setUser({ role: userRole });
      navigate("/");
    } else if (response.status === 400) {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs">
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
      >
        Login
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Invalid username or password.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;