export interface Group {
  uid: string;
  groupName: string,
  groupMembers: User[]
}

export interface User {
  email: string,
  uid: string
}

export interface LoggedInUser {
  displayName: string,
  email: string,
  uid: string,
  selectedDate: Date,
  selectedGroup: Group | null
}

export interface GroupsListProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface GroupsFormProps {
  setShowCreateGroupForm: React.Dispatch<React.SetStateAction<boolean>>,
  groupToBeEdited: Group | null
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_DATE = 'CHANGE_DATE';
export const SET_GROUPS = 'SET_GROUPS';
export const CLEAR_GROUPS = 'CLEAR_GROUPS';
export const CHANGE_SELECTED_GROUP = 'CHANGE_SELECTED_GROUP';
export const ADD_GROUP = 'ADD_GROUP';

interface LoginAction {
  type: typeof LOGIN,
  payload: LoggedInUser
}

interface LogoutAction {
  type: typeof LOGOUT,
}

interface ChangeDate {
  type: typeof CHANGE_DATE,
  payload: Date
}

interface SetGroups {
  type: typeof SET_GROUPS,
  payload: Group[]
}

interface AddGroup {
  type: typeof ADD_GROUP,
  payload: Group
}

interface ClearGroups {
  type: typeof CLEAR_GROUPS
}

interface ChangeSelectedGroup {
  type: typeof CHANGE_SELECTED_GROUP,
  payload: Group
}

export type UserActionTypes = LoginAction | LogoutAction | ChangeDate | ChangeSelectedGroup;
export type GroupsActionTypes = SetGroups | ClearGroups | AddGroup;
