import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FoodItemForm from './FoodItemForm';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
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
      <Tooltip title='Lägg till nytt recept' aria-label='add'>
        <Fab
          style={{ backgroundColor: 'green' }}
          className={classes.absolute}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <FoodItemForm open={open} setOpen={setOpen} recipeInfo={null} />
    </>
  );
}
