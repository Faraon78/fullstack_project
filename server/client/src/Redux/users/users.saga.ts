import { takeEvery, put, call } from 'redux-saga/effects';
import UsersActionTypes from './users.actionTypes';
import { fetchUsersSuccess, fetchUsersFailure } from './users.actions';

export function* fetchUsersAsync(): Generator<any> {
    try {
        let data: any = yield call(fetch, 'http://localhost:5000/users');
        data = yield data.json();
        yield put(fetchUsersSuccess(data));
    } catch (error: any) {
        yield put(fetchUsersFailure(error));
    }
}

export function* usersWatcher(): Generator<any> {
    yield takeEvery(UsersActionTypes.FETCH_USERS_START, fetchUsersAsync);
}
