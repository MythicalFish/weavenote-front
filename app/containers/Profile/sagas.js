import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as actionType from './constants';
import * as actions from './actions';

export default [appWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(actionType.UPDATE_PROFILE, updateProfile),
    yield takeLatest(actionType.REQUEST_PASSWORD, requestPassword),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* updateProfile({ user }) {
  yield sagas.patch('user', { user }, actions.updateProfileSuccess);
}

function* requestPassword() {
  yield sagas.get('reset_password', null, actions.requestPasswordSuccess);
}
