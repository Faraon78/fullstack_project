import { takeEvery, put, call } from 'redux-saga/effects';
import PostsActionTypes from './posts.actionTypes';
import { fetchPostsSuccess, fetchPostsFailure } from './posts.actions';

export function* fetchPostsAsync(): Generator<any> {
    try {
        let data: any = yield call(fetch, 'http://localhost:5000/posts');
        data = yield data.json();
        yield put(fetchPostsSuccess(data));
    } catch (error: any) {
        yield put(fetchPostsFailure(error));
    }
}

export function* postsWatcher(): Generator<any> {
    yield takeEvery(PostsActionTypes.FETCH_POSTS_START, fetchPostsAsync);
}
