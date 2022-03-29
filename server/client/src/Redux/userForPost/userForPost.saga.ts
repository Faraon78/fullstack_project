import { takeEvery, put, call } from 'redux-saga/effects';
import UserForPostTypes from './userForPost.actionTypes';
import {
    fetchUserForPostSuccess,
    fetchUserForPostFailure,
} from './userForPost.actions';

export function* fetchUserForPostAsync({ payload }: any): Generator<any> {
    try {
        let data: any = yield call(
            fetch,
            `http://localhost:5000/userforpost/${payload}`
        );
        data = yield data.json();
        yield put(fetchUserForPostSuccess(data));
    } catch (error: any) {
        yield put(fetchUserForPostFailure(error));
    }
}

export function* userForPostWatcher(): Generator<any> {
    yield takeEvery(
        UserForPostTypes.FETCH_USERFORPOST_START,
        fetchUserForPostAsync
    );
}
