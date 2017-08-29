import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export function* UserWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_USER, fetchUser),
    yield takeLatest(types.UPDATE_PROFILE, updateProfile),
    yield takeLatest(types.REQUEST_PASSWORD, requestPassword),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchUser() {
  yield sagas.get('user', null, actions.fetchUserSuccess);
}

function* updateProfile({ user }) {
  yield sagas.patch('user', { user }, actions.updateProfileSuccess);
}

function* requestPassword() {
  yield sagas.get('reset_password', null, actions.requestPasswordSuccess);
}
