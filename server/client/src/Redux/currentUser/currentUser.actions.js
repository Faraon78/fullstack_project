import CurrentUserActionTypes from './currentUser.actionTypes';


export const fetchCurrentUserStart = id => ({
  type: CurrentUserActionTypes.FETCH_CURRENTUSER_START,
  payload: id
});

export const fetchCurrentUserSuccess = data => ({
  type: CurrentUserActionTypes.FETCH_CURRENTUSER_SUCCESS,
  payload: data
});

export const fetchCurrentUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.FETCH_CURRENTUSER_FAILURE,
  payload: errorMessage
});

export const updateCurrentUser = currentUser => ({
    type: CurrentUserActionTypes.UPDATE_CURRENTUSER,
    payload: currentUser
  });