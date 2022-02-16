import { takeEvery, put, call } from 'redux-saga/effects'
import UsersActionTypes from './users.actionTypes'
import { fetchUsersSuccess, fetchUsersFailure } from './users.actions'

export function* fetchUsersAsync() {
    try {
        let data = yield call(
            fetch,
            'https://jsonplaceholder.typicode.com/users'
        )
        data = yield data.json()
        yield put(fetchUsersSuccess(data))
    } catch (error) {
        yield put(fetchUsersFailure())
    }
}

export function* usersWatcher() {
    yield takeEvery(UsersActionTypes.FETCH_USERS_START, fetchUsersAsync)
}
