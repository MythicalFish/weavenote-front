import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fetchStatsSuccess } from 'containers/App/actions';
import * as types from 'containers/App/constants/actions';
import * as API from 'utils/API';
import * as sagas from 'utils/genericSagas';

export default [dashWatcher];

function* dashWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_STATS, fetchStats),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchStats() {
  yield sagas.get('stats', null, fetchStatsSuccess);
}
