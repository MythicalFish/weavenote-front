
import { take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

export default [authWatcher];

export function* authWatcher() {
  const watcher = [];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}
