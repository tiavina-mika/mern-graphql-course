import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, lighten } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LoginForm from '../forms/login-form';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: '#9e1c1c',
    marginTop: theme.spacing(3)
  },
  text: {
    fontSize: 18
  },
  link: {
    marginLeft: theme.spacing(1),
    '&:hover': {
        color: 'blue',
    },
  },
  cardTitle: {
      fontFamily: 'Proxima Nova',
      fontSize: 52,
      color:'#fff',
      fontWeight: 100
  },
  iconTitle: {
      fontSize: 65,
      color: '#fff'
  }
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" mt={{ xs: 1, sm: 1, md: 8 }}>
          <Box>Login</Box>
          <LoginForm />
      </Box>
      <Box my={3}>
        <Typography className={classes.text}>You lost your password?<Link to="/check-email" className={classes.link}>Get it back</Link></Typography>
      </Box>
    </Container>
  );
}

export default Login;