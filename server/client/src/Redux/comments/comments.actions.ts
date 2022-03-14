import CommentsActionTypes from './comments.actionTypes';

export const fetchCommentsStart = (id: string | undefined) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_START,
    payload: id,
});

export const fetchCommentsSuccess = (data: Array<object>) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
    payload: data,
});

export const fetchCommentsFailure = (errorMessage: string) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_FAILURE,
    payload: errorMessage,
});
