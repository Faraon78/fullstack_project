import PostsActionTypes from './posts.actionTypes';
interface StatePosts {
    posts: Array<object>;
    isFetching: boolean;
    errorMessage: String;
}
const initialState: StatePosts = {
    posts: [],
    isFetching: false,
    errorMessage: '',
};
export const postsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PostsActionTypes.FETCH_POSTS_START:
            return {
                ...state,
                isFetching: false,
            };
        case PostsActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: true,
                posts: action.payload,
            };
        case PostsActionTypes.FETCH_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: null,
            };
        default:
            return state;
    }
};
