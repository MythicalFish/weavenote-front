import { put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { getFormValues, isDirty } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import { selectMeasurements } from './selectors';
import { selectProject } from '../ProjectManager/selectors';

export function* ProjectMeasurementsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MEASUREMENTS, fetchMeasurements),
    yield takeLatest(types.UPDATE_MEASUREMENTS, updateMeasurements),
    yield takeLatest(types.CREATE_MEASUREMENT_GROUP, createMeasurementGroup),
    yield takeLatest(types.CREATE_MEASUREMENT_NAME, createMeasurementName),

    yield takeLatest(types.CREATE_MEASUREMENT_GROUP_SUCCESS, resetForm),
    yield takeLatest(types.CREATE_MEASUREMENT_NAME_SUCCESS, resetForm),
    yield takeLatest(types.UPDATE_MEASUREMENTS_SUCCESS, resetForm),
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

function* updateMeasurements() {
  const dirty = yield select(isDirty('Measurements'));
  if (!dirty) return;
  const project = yield select(selectProject());
  const measurements = yield select(getFormValues('Measurements'));
  yield sagas.patch(
    `projects/${project.get('id')}/measurements`,
    { measurements },
    actions.updateMeasurementsSuccess
  );
}

function* resetForm() {
  const m = yield select(selectMeasurements());
  yield put(initialize('Measurements', m, { form: 'Measurements' }));
}
