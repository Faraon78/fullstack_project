import CurrentUserActionTypes from './currentUser.actionTypes';

const initialState ={
    currentUser: {},
    isFetching: false,
    errorMessage: undefined
}
export const currentUserReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CurrentUserActionTypes.FETCH_CURRENTUSER_START:
          return {
            ...state,
            isFetching: false
          };
        case CurrentUserActionTypes.FETCH_CURRENTUSER_SUCCESS:
          return {
            ...state,
            isFetching: true,
            currentUser: action.payload
          };
        case CurrentUserActionTypes.FETCH_CURRENTUSER_FAILURE:
          return {
            ...state,
            isFetching: false,
            errorMessage: action.payload
          };
        case CurrentUserActionTypes.UPDATE_CURRENTUSER:
            return {
              ...state,
              currentUser: action.payload
            };  
        default:
          return state;
      }
}