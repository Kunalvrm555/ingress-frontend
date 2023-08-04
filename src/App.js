import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import UserContext from './components/Shared/UserContext';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPage from './components/AdminPage/AdminPage';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  const [user, setUser] = useState(null);

  // Check for token at start up
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { username, userType, exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) throw new Error('Expired token');
        setUser({ role: userType, username });
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={user ? user.role === 'admin' ? <AdminPage /> : <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} /> */}
          {/* <Route path="/user" element={user?.role === 'user' ? <HomePage /> : <Navigate to="/login" />} /> */}
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
