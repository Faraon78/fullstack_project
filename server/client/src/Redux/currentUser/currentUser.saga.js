import {takeEvery, put, call} from 'redux-saga/effects';
import CurrentUserActionTypes from './currentUser.actionTypes';
import {fetchCurrentUserSuccess, fetchCurrentUserFailure} from './currentUser.actions';

export function* fetchCurrentUserAsync(){
    try {        
           
        let data = yield call(fetch,'http://localhost:5000/getuser');
         data = yield data.json();
        yield put(fetchCurrentUserSuccess(data));
      } catch (error) {
        yield put(fetchCurrentUserFailure());
      }
}

export function* currentUserWatcher(){
    yield takeEvery(
        CurrentUserActionTypes.FETCH_CURRENTUSER_START, 
        fetchCurrentUserAsync)
}