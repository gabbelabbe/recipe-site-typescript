import { 
  GET_RECIPES, 
  CLEAR_RECIPES, 
  Recipes, 
  RecipeActionTypes 
} from './types';

const initialState: Recipes | [] = [];

export function recipeReducer(
  state = initialState,
  action: RecipeActionTypes
): Recipes | [] {
  switch (action.type) {
    case GET_RECIPES:
      return action.payload;
    case CLEAR_RECIPES:
      return [];
    default:
      return state;
  }
}
