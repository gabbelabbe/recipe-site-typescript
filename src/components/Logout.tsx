import React from 'react';
import { auth } from '../firebase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  logoutButton: {
    color: 'white',
  },
}));

export default function Logout() {
  const classes = useStyles();

  function signOut(): void {
    auth().signOut();
  }

  return (
    <Tooltip title='Logga Ut'>
      <IconButton edge='end' onClick={signOut} className={classes.logoutButton}>
        <AccountCircleOutlinedIcon color='inherit' />
      </IconButton>
    </Tooltip>
  );
}
