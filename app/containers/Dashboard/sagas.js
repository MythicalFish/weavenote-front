import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fetchStatsSuccess } from 'containers/App/actions';
import * as types from 'containers/App/constants';
import * as API from 'utils/API';

export function* fetchStats() {
  try {
    const data = yield call(API.get, 'stats');
    yield put(fetchStatsSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchStatsWatcher() {
  const watcher = yield takeLatest(types.FETCH_STATS, fetchStats);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  fetchStatsWatcher,
];
