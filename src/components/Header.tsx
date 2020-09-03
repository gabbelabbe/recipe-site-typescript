import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoggedInUser } from '../store/user/types';
import { RootState } from '../store/index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { sub, getISOWeek, add } from 'date-fns';
import Login from './Login';
import Logout from './Logout';
import GroupButton from './GroupButton';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#333',
    alignItems: 'center',
  },
  accountButton: {
    position: 'absolute',
    zIndex: 1,
    width: '48px',
    height: '48px',
    [theme.breakpoints.up('sm')]: {
      top: '10px',
    },
    left: 'calc(100% - 48px)',
    top: '4px'
  },
}));

export default function Header() {
  const userState = useSelector<RootState, LoggedInUser | null>((state: RootState) => state.user);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div>
      {
        userState ? <GroupButton /> : null
      }
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <div />
          {
            userState ? ( 
              <Tooltip title='Gå tillbaka en vecka'>
                <IconButton
                  aria-label='back' 
                  style={{color: '#fff'}}
                  onClick={() => {
                    dispatch({type: 'CHANGE_DATE', payload: sub(userState.selectedDate, {weeks: 1})});;
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            ) : (
              null
              )
            }
          <Typography variant='h6' className={classes.title}>
            {userState ? 'Recept för vecka ' + getISOWeek(userState.selectedDate) : 'Logga in för att se dina recept'}
          </Typography>
          {
            userState ? ( 
              <Tooltip title='Gå framåt en vecka'>
                <IconButton
                  aria-label='back' 
                  style={{color: '#fff'}}
                  onClick={() => {
                    dispatch({type: 'CHANGE_DATE', payload: add(userState.selectedDate, {weeks: 1})});;
                  }}
                  >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
            ) : (
              null
              )
            }
        </Toolbar>
      </AppBar>
      <div className={classes.accountButton}>
        {
          !userState ? <Login /> : <Logout/>
        }
      </div>
    </div>
  );
}