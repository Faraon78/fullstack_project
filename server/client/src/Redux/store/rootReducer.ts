import { combineReducers } from 'redux';
import { postsReducer } from '../posts/posts.reducer';
import { usersReducer } from '../users/users.reducer';
import { commentsReducer } from '../comments/comments.reducer';
import { currentUserReducer } from '../currentUser/currentUser.reducer';
import { currentPostsReducer } from '../currentPosts/currentPosts.reducer';
import { userForPostReducer } from '../userForPost/userForPost.reducer';

export const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
    currentUser: currentUserReducer,
    currentPosts: currentPostsReducer,
    userForPost: userForPostReducer,
});
