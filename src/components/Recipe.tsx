import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { Recipe as RecipeType } from '../store/recipes/types';
import { firestore } from '../firebase';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(4) },
  paper: {
    background: '#333',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    position: 'relative',
  },
  name: { color: 'white', fontSize: '1.25rem', fontWeight: 'bold', margin: 0 },
  link: {
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline', textDecorationColor: 'white' },
  },
  date: {
    position: 'absolute',
    top: 0,
    margin: 0,
    left: 2,
    color: 'white',
    fontSize: '0.8rem',
  },
}));

export default function Recipe({ recipe }: { recipe: RecipeType }) {
  const classes = useStyles();

  const [group, setGroup] = useState<any>();

  const db = firestore();

  const groupRef = db.collection('groups');

  useEffect(() => {
    (async () => {
      if (recipe.groupUid) {
        const data = await groupRef.doc(recipe.groupUid).get();
        setGroup(data.data());
      }
    })();
  }, [recipe, groupRef]);

  return (
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Paper className={classes.paper}>
        <p className={classes.date}>{format(recipe.date, 'PP')}</p>
        <p className={classes.name}>{recipe.foodItem}</p>
        <a
          href={recipe.recipeLink}
          target='_blank'
          rel='noopener noreferrer'
          className={classes.link}
        >
          {new URL(recipe.recipeLink).hostname}
        </a>
        {group && <p>{group.name}</p>}
      </Paper>
    </Grid>
  );
}
