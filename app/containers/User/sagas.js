import { take, cancel, takeLatest, select } from 'redux-saga/effects';
import { getFormValues, isDirty } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export function* UserWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_USER, fetchUser),
    yield takeLatest(types.UPDATE_USER, updateUser),
    yield takeLatest(types.REQUEST_PASSWORD, requestPassword),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchUser() {
  yield sagas.get('user', null, actions.fetchUserSuccess);
}

function* updateUser() {
  const user = yield select(getFormValues('UserInfo'));
  yield sagas.patch('user', { user }, actions.updateUserSuccess);
}

function* requestPassword() {
  yield sagas.get('reset_password', null, actions.requestPasswordSuccess);
}
