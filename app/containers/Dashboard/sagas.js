import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getStatsSuccess } from 'containers/App/actions';
import * as types from 'containers/App/constants';
import { request } from 'utils/request';

export function* getStats() {
  try {
    const data = yield call(request, { path: 'stats' });
    yield put(getStatsSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* getStatsWatcher() {
  const watcher = yield takeLatest(types.GET_STATS, getStats);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  getStatsWatcher,
];
