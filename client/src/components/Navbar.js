import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
        </Typography>
        <Button color="inherit">
          <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>Users</Link>
        </Button>
        <Button color="inherit">
          <Link to="/brands" style={{ textDecoration: 'none', color: 'inherit' }}>Brands</Link>
        </Button>
        <Button color="inherit">
          <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
        </Button>
        <Button color="inherit" onClick={isLoggedIn ? handleLogout : null}>
          <Link to={isLoggedIn ? '#' : '/login'} style={{ textDecoration: 'none', color: 'inherit' }}>{isLoggedIn ? 'Logout' : 'Login'}</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;




