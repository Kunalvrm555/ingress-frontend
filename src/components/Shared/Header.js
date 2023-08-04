import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import logo from './logo.png';
import { Box } from '@mui/system';

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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
