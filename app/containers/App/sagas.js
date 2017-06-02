
import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [appWatcher];

export function* appWatcher() {
  const watcher = [];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}
