import {
  SET_RECIPES,
  CLEAR_RECIPES,
  Recipes,
  RecipeActionTypes,
  ADD_RECIPE,
} from './types';

const initialState: Recipes = [];

export function recipeReducer(
  state = initialState,
  action: RecipeActionTypes
): Recipes {
  switch (action.type) {
    case SET_RECIPES:
      return action.payload;
    case CLEAR_RECIPES:
      return [];
    case ADD_RECIPE:
      return [...state, action.payload];
    default:
      return state;
  }
}
