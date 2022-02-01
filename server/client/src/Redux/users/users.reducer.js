import UsersActionTypes from './users.actionTypes';

const initialState ={
    users: [],
    isFetching: false,
    errorMessage: undefined
}
export const usersReducer = (state = initialState, action) =>{
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS_START:
          return {
            ...state,
            isFetching: false
          };
        case UsersActionTypes.FETCH_USERS_SUCCESS:
          return {
            ...state,
            isFetching: true,
            users: action.payload
          };
        case UsersActionTypes.FETCH_USERS_FAILURE:
          return {
            ...state,
            isFetching: false,
            errorMessage: action.payload
          };
        default:
          return state;
      }
}