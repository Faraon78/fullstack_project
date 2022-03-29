import { takeEvery, put, call } from 'redux-saga/effects';
import CurrentPostsActionTypes from './currentPosts.actionTypes';
import {
    fetchCurrentPostsSuccess,
    fetchCurrentPostsFailure,
} from './currentPosts.actions';

export function* fetchCurrentPostsAsync({ payload }: any): Generator<any> {
    try {
        let data: any = yield call(
            fetch,
            `http://localhost:5000/curPosts/${payload}`
        );
        data = yield data.json();
        yield put(fetchCurrentPostsSuccess(data));
    } catch (error: any) {
        yield put(fetchCurrentPostsFailure(error));
    }
}

export function* currentPostsWatcher(): Generator<any> {
    yield takeEvery(
        CurrentPostsActionTypes.FETCH_CURRENTPOSTS_START,
        fetchCurrentPostsAsync
    );
}
