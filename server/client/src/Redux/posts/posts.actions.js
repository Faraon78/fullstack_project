import PostsActionTypes from './posts.actionTypes'

export const fetchPostsStart = () => ({
    type: PostsActionTypes.FETCH_POSTS_START,
})

export const fetchPostsSuccess = (data) => ({
    type: PostsActionTypes.FETCH_POSTS_SUCCESS,
    payload: data,
})

export const fetchPostsFailure = (errorMessage) => ({
    type: PostsActionTypes.FETCH_POSTS_FAILURE,
    payload: errorMessage,
})
