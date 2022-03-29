import UserForPostActionTypes from './userForPost.actionTypes';

interface StateUserForPost {
    userForPost: object;
    isFetching: boolean;
    errorMessage: string;
}
const initialState: StateUserForPost = {
    userForPost: {},
    isFetching: false,
    errorMessage: '',
};
export const userForPostReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UserForPostActionTypes.FETCH_USERFORPOST_START:
            return {
                ...state,
                isFetching: false,
            };
        case UserForPostActionTypes.FETCH_USERFORPOST_SUCCESS:
            return {
                ...state,
                isFetching: true,
                userForPost: action.payload,
            };
        case UserForPostActionTypes.FETCH_USERFORPOST_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: null,
            };
        default:
            return state;
    }
};
