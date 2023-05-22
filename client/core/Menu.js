import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#000000' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar style={{ backgroundColor: '#FF0000' }}> {/* Color de fondo rojo */}
      <Typography variant="h6" color="inherit">
        PostUAO
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, '/')}>
          <HomeIcon />
        </IconButton>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to="/signup">
            <Button style={isActive(history, '/signup')}>Registro</Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, '/signin')}>Inicio Sesión</Button>
          </Link>
        </span>
      )}
      {auth.isAuthenticated() && (
        <span>
          <Link to={'/user/' + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, '/user/' + auth.isAuthenticated().user._id)}>
              Mi perfil
            </Button>
          </Link>
          <Button
            color="inherit"
            onClick={() => {
              auth.clearJWT(() => history.push('/'));
            }}
          >
            Salir
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;

