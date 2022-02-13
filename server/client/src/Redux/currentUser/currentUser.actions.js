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
    type: CurrentUserActionTypes.UPDATE_CURRENT_USER,
    payload: currentUser
  });

  export const userSetToken = token => ({
    type: CurrentUserActionTypes.SET_TOKEN,
    payload: token
  });