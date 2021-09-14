import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import GroupsList from './GroupsList';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      top: 10,
    },
    top: 4,
    left: 0,
  },
}));

export default function AddNewRecipe() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title='Se dina grupper'>
        <IconButton className={classes.absolute} onClick={handleClickOpen}>
          <GroupIcon color='inherit' />
        </IconButton>
      </Tooltip>
      <GroupsList open={open} setOpen={setOpen} />
    </>
  );
}
