import CommentsActionTypes from './comments.actionTypes'

export const fetchCommentsStart = (id) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_START,
    payload: { id },
})

export const fetchCommentsSuccess = (data) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
    payload: data,
})

export const fetchCommentsFailure = (errorMessage) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_FAILURE,
    payload: errorMessage,
})
