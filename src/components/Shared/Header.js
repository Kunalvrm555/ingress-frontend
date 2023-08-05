import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import logo from './logo.png';
import devsocLogo from './devsoc.png';

const Header = () => {
  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img src={logo} alt="logo" width="50" height="50" />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, fontFamily: 'Poppins', fontWeight: '500' }}>
            CENTRAL LIBRARY, IIT KHARAGPUR
          </Typography>
          <Typography variant="subtitle1" color="inherit" sx={{ fontFamily : 'Poppins', mr: 1 }}>
            Developed by :
          </Typography>
          <Box sx={{ backgroundColor: '#F5F5F5', borderRadius: '5px', border: '1px solid rgba(240, 240, 240, 0.5)', p: 0.5, height: "fit-content", display: "flex", alignItems: "center" }}>
            <img src={devsocLogo} alt="developer-logo" height="40" />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
