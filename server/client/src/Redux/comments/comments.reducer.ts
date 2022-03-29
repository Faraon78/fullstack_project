import CommentsActionTypes from './comments.actionTypes';
interface commentState {
    comments: Array<object>;
    isFetching: boolean;
    errorMessage: string;
}

const initialState: commentState = {
    comments: [],
    isFetching: false,
    errorMessage: '',
};
export const commentsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CommentsActionTypes.FETCH_COMMENTS_START:
            return {
                ...state,
                isFetching: false,
            };
        case CommentsActionTypes.FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isFetching: true,
                comments: action.payload,
            };
        case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: '',
            };
        default:
            return state;
    }
};
