import { 
  LOGIN, 
  LOGOUT, 
  CHANGE_DATE,
  CHANGE_SELECTED_GROUP,
  LoggedInUser, 
  UserActionTypes,
  SET_GROUPS,
  CLEAR_GROUPS,
  Group,
  GroupsActionTypes,
} from './types';

export function login(user: LoggedInUser): UserActionTypes {
  return {
    type: LOGIN,
    payload: user
  };
}

export function logout(): UserActionTypes {
  return {
    type: LOGOUT,
  }
}

export function changeDate(date: Date): UserActionTypes {
  return {
    type: CHANGE_DATE,
    payload: date
  }
}

export function setGroups(groups: Group[]): GroupsActionTypes {
  return {
    type: SET_GROUPS,
    payload: groups
  }
}

export function clearGroups(): GroupsActionTypes {
  return {
    type: CLEAR_GROUPS
  }
}

export function changeSelectedGroup(selectedGroup: Group): UserActionTypes {
  return {
    type: CHANGE_SELECTED_GROUP,
    payload: selectedGroup
  }
}
