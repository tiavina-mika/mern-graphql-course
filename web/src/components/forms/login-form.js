import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { useHistory } from "react-router";
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import useLoginMutation from '../../graphql/mutations/auth/login';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    fontSize: 16,
    color: '#000',
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1.6),
    paddingBottom: theme.spacing(1.6),
    backgroundColor: 'blue',
    border: `1px solid blue`,
    boxShadow: 'none',
    '&:hover': {
        color: 'blue',
        boxShadow: 'none',
    },
  },
}));

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({
      password: '',
      email: ''
    });

    let history = useHistory();
    const classes = useStyles();

    const handleError = ({ graphQLErrors }) => {
      if (graphQLErrors) {
          const error = graphQLErrors[0].message;
          const errorMessage = {
            password: '',
            email: '',
          }

          // error.split(',').map(e => {
          //     if (e === "PASSWORD_EMPTY") {
          //       errorMessage.password = PASSWORD_EMPTY;
          //     } else if (e === "PASSWORD_LENGTH") {
          //       errorMessage.password = PASSWORD_LENGTH;
          //     }

          //     if (e === "EMAIL_EMPTY") {
          //       errorMessage.email = EMAIL_EMPTY;
          //     } else if (e === "EMAIL_INVALID") {
          //       errorMessage.email = EMAIL_INVALID;
          //     }
          //     return e;
          // })
          // if (error.startsWith("AuthenticationError")) {
          //   errorMessage.email = EMAIL_NOT_FOUND;
          // }
          setErrorMessages(errorMessage);
        }
    }

    let  [ login ] = useLoginMutation(handleError);

    const submit = async e => {
        e.preventDefault();
        try {
          const result = await login({ email, password })
          console.log('result: ', result);
          if (result) {
              localStorage.setItem("token", result.data.login.token);
              localStorage.setItem("user", result.data.login.isAdmin);
              history.push("/");
          }
        } catch (e) {
            console.log('error: ', e);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    }

    return (
        <form className={classes.form} onSubmit={submit}>
            <TextField
                error={errorMessages && errorMessages.email ? true: false}
                onChange={handleChange}
                value={email}
                errorMessage={errorMessages && errorMessages.email}
                type="email"
                name="email"
                placeholder="some@email.com"
                mt={2}
                mb={3}
                icon={<MailIcon />}
            />
            <TextField
                error={errorMessages && errorMessages.password ? true: false}
                onChange={handleChange}
                name="password"
                type="password"
                value={password}
                mt={2}
                mb={2}
                errorMessage={errorMessages && errorMessages.password}
                placeholder="Enter new password"
                icon={<LockIcon/>}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                className={classes.submit}
            >
              Sign In
            </Button>
        </form>
  );
}

export default LoginForm;