import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';

export default [watch];

function* watch() {
  const watcher = [yield takeLatest(types.ADD_ANNOTATION, something)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* something() {
  // yield sagas.get('stats', null, fetchStatsSuccess);
}
