export interface Recipe {
  date: Date,
  foodItem: string,
  id: string,
  recipeLink: string,
  ownerUid: string,
  sharedUids: string[],
  week: number,
  groupUid: string
}

export interface Recipes {
  recipes: Recipe[]
}

export interface FoodItemFormType {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  recipeInfo: Recipe | null
}

export const GET_RECIPES = 'GET_RECIPES';
export const CLEAR_RECIPES = 'CLEAR_RECIPES';

interface GetRecipesAction {
  type: typeof GET_RECIPES,
  payload: Recipes
}

interface ClearRecipesAction {
  type: typeof CLEAR_RECIPES
}

export type RecipeActionTypes = GetRecipesAction | ClearRecipesAction;

