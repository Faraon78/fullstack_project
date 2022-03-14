import CurrentPostsActionTypes from './currentPosts.actionTypes';

export const fetchCurrentPostsStart = (id: string) => ({
    type: CurrentPostsActionTypes.FETCH_CURRENTPOSTS_START,
    payload: id,
});

export const fetchCurrentPostsSuccess = (data: Array<object>) => ({
    type: CurrentPostsActionTypes.FETCH_CURRENTPOSTS_SUCCESS,
    payload: data,
});

export const fetchCurrentPostsFailure = (errorMessage: string) => ({
    type: CurrentPostsActionTypes.FETCH_CURRENTPOSTS_FAILURE,
    payload: errorMessage,
});
