import CommentsActionTypes from './comments.actionTypes';

const initialState ={
    comments: [],
    isFetching: false,
    errorMessage: undefined
}
export const commentsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CommentsActionTypes.FETCH_COMMENTS_START:
          return {
            ...state,
            isFetching: false
          };
        case CommentsActionTypes.FETCH_COMMENTS_SUCCESS:
          return {
            ...state,
            isFetching: true,
            comments: action.payload
          };
        case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
          return {
            ...state,
            isFetching: false,
            errorMessage: null
          };
        default:
          return state;
      }
}