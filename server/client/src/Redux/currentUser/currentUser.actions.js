import CurrentUserActionTypes from './currentUser.actionTypes';


export const fetchCurrentUserStart = (email) => ({
  type: CurrentUserActionTypes.FETCH_CURRENTUSER_START,
  payload: email
});

export const fetchCurrentUserSuccess = data => ({
  type: CurrentUserActionTypes.FETCH_CURRENTUSER_SUCCESS,
  payload: data
});

export const fetchCurrentUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.FETCH_CURRENTUSER_FAILURE,
  payload: errorMessage
});

export const updateCurrentUser = (currentUser) => ({
    type: CurrentUserActionTypes.UPDATE_CURRENTUSER,
    payload: currentUser
  });