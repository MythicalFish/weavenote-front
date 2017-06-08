import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fetchStatsSuccess } from 'containers/App/actions';
import * as types from 'containers/App/constants/actions';
import * as API from 'utils/API';
import { notify } from 'containers/App/Notification';

export default [dashWatcher];

function* dashWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_STATS, fetchStats),
    yield takeLatest(types.FETCH_STATS_SUCCESS, showSuccess),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchStats() {
  try {
    const data = yield call(API.get, 'stats');
    yield put(fetchStatsSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

function* showSuccess() {
  yield put(notify({
    message: 'Stats fetched successfully',
  }));
}
