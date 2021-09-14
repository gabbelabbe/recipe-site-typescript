export interface Recipe {
  date: Date;
  foodItem: string;
  id: string;
  recipeLink: string;
  ownerUid: string;
  week: number;
  groupUid: string;
}

export type Recipes = Recipe[];

export interface FoodItemFormType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  recipeInfo: Recipe | null;
}

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const CLEAR_RECIPES = 'CLEAR_RECIPES';

interface GetRecipesAction {
  type: typeof SET_RECIPES;
  payload: Recipes;
}

interface AddRecipesAction {
  type: typeof ADD_RECIPE;
  payload: Recipe;
}

interface ClearRecipesAction {
  type: typeof CLEAR_RECIPES;
}

export type RecipeActionTypes =
  | GetRecipesAction
  | ClearRecipesAction
  | AddRecipesAction;
