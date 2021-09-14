import {
  SET_RECIPES,
  CLEAR_RECIPES,
  Recipes,
  RecipeActionTypes,
  Recipe,
  ADD_RECIPE,
} from './types';

export function getRecipes(recipes: Recipes): RecipeActionTypes {
  return {
    type: SET_RECIPES,
    payload: recipes,
  };
}

export function addRecipes(newRecipe: Recipe): RecipeActionTypes {
  return {
    type: ADD_RECIPE,
    payload: newRecipe,
  };
}

export function clearRecipes(): RecipeActionTypes {
  return {
    type: CLEAR_RECIPES,
  };
}
