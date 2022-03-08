import CurrentUserActionTypes from './currentUser.actionTypes';

interface StateCurrentUser {
    currentUser: any;
    token: object | null;
    isFetching: boolean;
    errorMessage: String;
}
const initialState: StateCurrentUser = {
    currentUser: {},
    token: null,
    isFetching: false,
    errorMessage: '',
};
export const currentUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CurrentUserActionTypes.FETCH_CURRENTUSER_START:
            return {
                ...state,
                isFetching: false,
            };
        case CurrentUserActionTypes.FETCH_CURRENTUSER_SUCCESS:
            return {
                ...state,
                isFetching: true,
                currentUser: action.payload,
            };
        case CurrentUserActionTypes.FETCH_CURRENTUSER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: null,
            };
        case CurrentUserActionTypes.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case CurrentUserActionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};
