import {
  User,
  LOGIN,
  LOGOUT,
  CHANGE_DATE,
  UserActionTypes,
  Group,
  SET_GROUPS,
  CLEAR_GROUPS,
  GroupsActionTypes,
  CHANGE_SELECTED_GROUP
} from './types';

const initialUserState: User | null = null;
const initialGroupsState: Group[] | null = null;

export function userReducer(
  state = initialUserState,
  action: UserActionTypes
): User | null {
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
    case CLEAR_GROUPS:
      return null;
    default:
      return state;
  }
}
