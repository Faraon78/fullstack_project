import { combineReducers } from "redux";
import { postsReducer } from "./posts.reducer";
import { usersReducer } from "../users/users.reducer";
import { commentsReducer } from "../comments/comments.reducer";
import { currentUserReducer } from "../currentUser/currentUser.reducer";


export const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    comments:commentsReducer,
    currentUser: currentUserReducer
});