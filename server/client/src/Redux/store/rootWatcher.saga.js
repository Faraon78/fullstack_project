import {all} from 'redux-saga/effects';
import { postsWatcher } from '../posts/posts.saga';
import { usersWatcher } from '../users/users.saga';
import { commentsWatcher } from '../comments/comments.saga';
import { currentUserWatcher } from '../currentUser/currentUser.saga';

export function* rootWatcher(){
    yield all([
        postsWatcher(),
        usersWatcher(),
        commentsWatcher(),
        currentUserWatcher()
    ])
}