import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import logo from "./logo.png";
import UserContext from "../Shared/UserContext";
import devsocLogo from "./devsoc.png";
import logoutIcon from "./logout.png";

const Header = () => {
  const { token, setToken } = useContext(UserContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  return (
    <Box sx={{ position: "sticky", top: 0, zIndex: 999 }}>
      <AppBar position="static">
        <Toolbar>
          <a
            href="https://library.iitkgp.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={logo} alt="logo" width="50" height="50" />
            </IconButton>
          </a>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontFamily: "Arial", fontWeight: "500" }}
          >
            CENTRAL LIBRARY, IIT KHARAGPUR
          </Typography>
          <Typography
            variant="subtitle1"
            color="inherit"
            sx={{ fontFamily: "Arial", mr: 1 }}
          >
            Developed by :
          </Typography>
          <Box
            sx={{
              backgroundColor: "#F3F3F3",
              borderRadius: "5px",
              border: "1px solid rgba(240, 240, 240, 0.5)",
              p: 0.5,
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "110px",
              minHeight: "40px",
            }}
          >
            <img
              src={devsocLogo}
              alt="developer-logo"
              height="40"
              style={imgLoaded ? {} : { display: "none" }}
              onLoad={() => setImgLoaded(true)}
            />
          </Box>
          {token && (
            <IconButton color="inherit" sx={{ ml: 2 }} onClick={handleLogout}>
              <img src={logoutIcon} alt="logout" width="30" height="30" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
