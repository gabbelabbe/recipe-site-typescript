import { 
  GET_RECIPES, 
  CLEAR_RECIPES, 
  Recipes, 
  RecipeActionTypes 
} from './types';

export function getRecipes(recipes: Recipes): RecipeActionTypes {
  return {
    type: GET_RECIPES,
    payload: recipes
  }
}

export function clearRecipes(): RecipeActionTypes {
  return {
    type: CLEAR_RECIPES
  }
}