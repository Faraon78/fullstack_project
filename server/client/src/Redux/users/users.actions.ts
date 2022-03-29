import UsersActionTypes from './users.actionTypes';

export const fetchUsersStart = () => ({
    type: UsersActionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (data: any) => ({
    type: UsersActionTypes.FETCH_USERS_SUCCESS,
    payload: data,
});

export const fetchUsersFailure = (errorMessage: any) => ({
    type: UsersActionTypes.FETCH_USERS_FAILURE,
    payload: errorMessage,
});
