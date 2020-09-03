import { combineReducers } from 'redux';
import { userReducer, groupsReducer } from './user/reducers';
import { recipeReducer } from './recipes/reducers';

export const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipeReducer,
  groups: groupsReducer
});

export type RootState = ReturnType<typeof rootReducer>;