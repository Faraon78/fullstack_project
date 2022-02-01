import UsersActionTypes from './users.actionTypes';


export const fetchUsersStart = () => ({
  type: UsersActionTypes.FETCH_USERS_START
});

export const fetchUsersSuccess = data => ({
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: data
});

export const fetchUsersFailure = errorMessage => ({
  type: UsersActionTypes.FETCH_USERS_FAILURE,
  payload: errorMessage
});
