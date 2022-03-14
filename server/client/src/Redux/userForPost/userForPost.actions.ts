import UserForPostTypes from './userForPost.actionTypes';

export const fetchUserForPostStart = (id: string | undefined) => ({
    type: UserForPostTypes.FETCH_USERFORPOST_START,
    payload: id,
});

export const fetchUserForPostSuccess = (data: Object) => ({
    type: UserForPostTypes.FETCH_USERFORPOST_SUCCESS,
    payload: data,
});

export const fetchUserForPostFailure = (errorMessage: any) => ({
    type: UserForPostTypes.FETCH_USERFORPOST_FAILURE,
    payload: errorMessage,
});
