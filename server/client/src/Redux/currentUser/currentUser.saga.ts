import { takeEvery, put, call } from 'redux-saga/effects';
import CurrentUserActionTypes from './currentUser.actionTypes';
import {
    fetchCurrentUserSuccess,
    fetchCurrentUserFailure,
} from './currentUser.actions';

export function* fetchCurrentUserAsync({ payload }: any): Generator<any> {
    try {
        let data: any = yield call(
            fetch,
            `http://localhost:5000/users/${payload}`
        );
        data = yield data.json();
        yield put(fetchCurrentUserSuccess(data));
    } catch (error: any) {
        yield put(fetchCurrentUserFailure(error));
    }
}

export function* currentUserWatcher(): Generator<any> {
    yield takeEvery(
        CurrentUserActionTypes.FETCH_CURRENTUSER_START,
        fetchCurrentUserAsync
    );
}
