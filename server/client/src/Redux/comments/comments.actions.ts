import CommentsActionTypes from './comments.actionTypes';

export const fetchCommentsStart = (id: number) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_START,
    payload: { id },
});

export const fetchCommentsSuccess = (data: any) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
    payload: data,
});

export const fetchCommentsFailure = (errorMessage: any) => ({
    type: CommentsActionTypes.FETCH_COMMENTS_FAILURE,
    payload: errorMessage,
});
