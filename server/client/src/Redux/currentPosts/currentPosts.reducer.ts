import CurrentPostsActionTypes from './currentPosts.actionTypes';

interface StateCurrentPosts {
    currentPosts: Array<object>;
    isFetching: boolean;
    errorMessage: String;
}
const initialState: StateCurrentPosts = {
    currentPosts: [],
    isFetching: false,
    errorMessage: '',
};
export const currentPostsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CurrentPostsActionTypes.FETCH_CURRENTPOSTS_START:
            return {
                ...state,
                isFetching: false,
            };
        case CurrentPostsActionTypes.FETCH_CURRENTPOSTS_SUCCESS:
            return {
                ...state,
                isFetching: true,
                currentPosts: action.payload,
            };
        case CurrentPostsActionTypes.FETCH_CURRENTPOSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: null,
            };
        default:
            return state;
    }
};
