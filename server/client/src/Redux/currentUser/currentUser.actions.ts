import CurrentUserActionTypes from './currentUser.actionTypes';

export const fetchCurrentUserStart = (id: number) => ({
    type: CurrentUserActionTypes.FETCH_CURRENTUSER_START,
    payload: id,
});

export const fetchCurrentUserSuccess = (data: Object) => ({
    type: CurrentUserActionTypes.FETCH_CURRENTUSER_SUCCESS,
    payload: data,
});

export const fetchCurrentUserFailure = (errorMessage: any) => ({
    type: CurrentUserActionTypes.FETCH_CURRENTUSER_FAILURE,
    payload: errorMessage,
});

export const updateCurrentUser = (currentUser: Object) => ({
    type: CurrentUserActionTypes.UPDATE_CURRENT_USER,
    payload: currentUser,
});

export const userSetToken = (token: string | null) => ({
    type: CurrentUserActionTypes.SET_TOKEN,
    payload: token,
});
