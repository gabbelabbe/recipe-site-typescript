import {
  LoggedInUser,
  LOGIN,
  LOGOUT,
  CHANGE_DATE,
  UserActionTypes,
  Group,
  SET_GROUPS,
  CLEAR_GROUPS,
  GroupsActionTypes,
  CHANGE_SELECTED_GROUP,
  ADD_GROUP
} from './types';

const initialUserState: LoggedInUser | null = null;
const initialGroupsState: Group[] | null = null;

export function userReducer(
  state = initialUserState,
  action: UserActionTypes
): LoggedInUser | null {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    case CHANGE_DATE:
      return {...state!, selectedDate: action.payload};
    case CHANGE_SELECTED_GROUP:
      return {...state!, selectedGroup: action.payload};
    default:
      return state;
  }
}

export function groupsReducer(
  state = initialGroupsState,
  action: GroupsActionTypes
): Group[] | null {
  switch (action.type) {
    case SET_GROUPS:
      return action.payload;
    case ADD_GROUP:
      return [...(state ? state : []), action.payload];
    case CLEAR_GROUPS:
      return null;
    default:
      return state;
  }
}
