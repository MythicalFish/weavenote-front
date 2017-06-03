
import { take, takeLatest, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [orgWatcher];

export function* orgWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_ORG, createOrg),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* createOrg() {
  yield sagas.post('organizations', actions.createOrgSuccess);
}
