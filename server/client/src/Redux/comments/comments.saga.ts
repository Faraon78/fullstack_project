import { takeEvery, put, call } from 'redux-saga/effects';
import CommentsActionTypes from './comments.actionTypes';
import { fetchCommentsSuccess, fetchCommentsFailure } from './comments.actions';

export function* fetchCommentsAsync({ payload }: any): Generator<any> {
    try {
        let data: any = yield call(
            fetch,
            `http://localhost:5000/comments/${payload}`
        );
        data = yield data.json();
        yield put(fetchCommentsSuccess(data));
    } catch (errorMessage: any) {
        yield put(fetchCommentsFailure(errorMessage));
    }
}

export function* commentsWatcher(): Generator<any> {
    yield takeEvery(
        CommentsActionTypes.FETCH_COMMENTS_START,
        fetchCommentsAsync
    );
}
