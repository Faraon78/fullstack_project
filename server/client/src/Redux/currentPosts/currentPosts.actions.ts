import CurrentPostsActionTypes from './currentPosts.actionTypes';

export const fetchCurrentPostsStart = (id: number) => ({
    type: CurrentPostsActionTypes.FETCH_CURRENTPOSTS_START,
    payload: id,
});

export const fetchCurrentPostsSuccess = (data: any) => ({
    type: CurrentPostsActionTypes.FETCH_CURRENTPOSTS_SUCCESS,
    payload: data,
});

export const fetchCurrentPostsFailure = (errorMessage: any) => ({
    type: CurrentPostsActionTypes.FETCH_CURRENTPOSTS_FAILURE,
    payload: errorMessage,
});
