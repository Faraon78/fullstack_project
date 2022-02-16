import { takeEvery, put, call } from 'redux-saga/effects'
import CommentsActionTypes from './comments.actionTypes'
import { fetchCommentsSuccess, fetchCommentsFailure } from './comments.actions'

export function* fetchCommentsAsync(action) {
    try {
        let data = yield call(
            fetch,
            `https://jsonplaceholder.typicode.com/posts/${action.payload.id}/comments`
        )
        data = yield data.json()
        yield put(fetchCommentsSuccess(data))
    } catch (error) {
        yield put(fetchCommentsFailure())
    }
}

export function* commentsWatcher() {
    yield takeEvery(
        CommentsActionTypes.FETCH_COMMENTS_START,
        fetchCommentsAsync
    )
}
