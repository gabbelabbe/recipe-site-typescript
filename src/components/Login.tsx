import React from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    color: 'white',
  },
}));

export default function Login() {
  const googleLoginProvider = new firebase.auth.GoogleAuthProvider();

  const classes = useStyles();

  function googleLogin(): void {
    auth().signInWithPopup(googleLoginProvider);
  }

  return (
    <Tooltip title='Log in'>
      <IconButton
        edge='end'
        onClick={googleLogin}
        className={classes.loginButton}
      >
        <AccountCircleIcon color='inherit' />
      </IconButton>
    </Tooltip>
  );
}
