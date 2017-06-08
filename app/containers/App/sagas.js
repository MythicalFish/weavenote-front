
import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants/actions';
import * as actions from './actions';

export default [appWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_USER, fetchUser),
    yield takeLatest(types.FETCH_USER_SUCCESS, createOrganization),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchUser() {
  yield sagas.get('user', actions.fetchUserSuccess);
}

export function* createOrganization(action) {
  const { current_organization: current } = action.data;
  if (!current) {
    browserHistory.push('/organization');
  }
}