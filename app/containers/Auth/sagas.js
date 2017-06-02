
import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [authWatcher];

export function* authWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_USER, fetchUser),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchUser() {
  yield sagas.get('user', actions.fetchUserSuccess);
}
