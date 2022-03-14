import PostsActionTypes from './posts.actionTypes';

export const fetchPostsStart = () => ({
    type: PostsActionTypes.FETCH_POSTS_START,
});

export const fetchPostsSuccess = (data: Array<object>) => ({
    type: PostsActionTypes.FETCH_POSTS_SUCCESS,
    payload: data,
});

export const fetchPostsFailure = (errorMessage: string) => ({
    type: PostsActionTypes.FETCH_POSTS_FAILURE,
    payload: errorMessage,
});
