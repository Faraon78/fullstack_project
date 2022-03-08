import { takeEvery, put, call } from 'redux-saga/effects';
import CommentsActionTypes from './comments.actionTypes';
import { fetchCommentsSuccess, fetchCommentsFailure } from './comments.actions';

export function* fetchCommentsAsync(action: any): Generator<any> {
    try {
        let data: any = yield call(
            fetch,
            `https://jsonplaceholder.typicode.com/posts/${action.payload.id}/comments`
        );
        data = yield data.json();
        yield put(fetchCommentsSuccess(data));
    } catch (error) {
        yield put(fetchCommentsFailure(error));
    }
}

export function* commentsWatcher(): Generator<any> {
    yield takeEvery(
        CommentsActionTypes.FETCH_COMMENTS_START,
        fetchCommentsAsync
    );
}
