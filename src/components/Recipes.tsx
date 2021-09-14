import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Recipes as RecipesType } from '../store/recipes/types';
import Recipe from './Recipe';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
}));

export default function Recipes() {
  const classes = useStyles();

  const recipes = useSelector<RootState, RecipesType>(
    (s: RootState) => s.recipes
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent='center'>
        {recipes?.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
        ))}
      </Grid>
    </div>
  );
}
