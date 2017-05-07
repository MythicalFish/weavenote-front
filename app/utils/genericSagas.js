
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from './API';

export function* fetchResources(path, params, successAction) {
  try {
    const resources = yield call(API.get, path, params);
    yield put(successAction(resources));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
export function* fetchResourcesWatcher(watchedAction, path, params, successAction) {
  const watcher = yield takeLatest(watchedAction, fetchResources(path, params, successAction));
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
