import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export function* ProjectMeasurementsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MEASUREMENTS, fetchMeasurements),
    yield takeLatest(types.UPDATE_MEASUREMENTS, updateMeasurements),
    yield takeLatest(types.CREATE_MEASUREMENT_GROUP, createMeasurementGroup),
    yield takeLatest(types.CREATE_MEASUREMENT_NAME, createMeasurementName),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchMeasurements(action) {
  yield sagas.get(
    `projects/${action.projectID}/measurements`,
    null,
    actions.fetchMeasurementsSuccess
  );
}

function* createMeasurementGroup(action) {
  const group = { name: 'X' };
  yield sagas.post(
    `projects/${action.projectID}/measurement_groups`,
    { group },
    actions.createMeasurementGroupSuccess
  );
}

function* createMeasurementName(action) {
  const name = { value: 'Untitled' };
  yield sagas.post(
    `projects/${action.projectID}/measurement_names`,
    { name },
    actions.createMeasurementNameSuccess
  );
}

function* updateMeasurements(action) {
  const measurements = action.measurements.toJS();
  const projectID = measurements.groups[0].project_id;
  try {
    const response = yield call(
      API.patch,
      `projects/${projectID}/measurements`,
      { measurements }
    );
    yield put(actions.updateMeasurementsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
