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
    yield takeLatest(types.DELETE_MEASUREMENT_GROUP, deleteMeasurementGroup),
    yield takeLatest(types.DELETE_MEASUREMENT_NAME, deleteMeasurementName),

    yield takeLatest(types.CREATE_MEASUREMENT_GROUP_SUCCESS, resetForm),
    yield takeLatest(types.CREATE_MEASUREMENT_NAME_SUCCESS, resetForm),
    yield takeLatest(types.UPDATE_MEASUREMENTS_SUCCESS, resetForm),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchMeasurements({ projectID }) {
  yield sagas.get(url(projectID), null, actions.fetchMeasurementsSuccess);
}

function* createMeasurementGroup({ projectID }) {
  const group = { name: 'X' };
  yield sagas.post(
    groupUrl(projectID),
    { group },
    actions.createMeasurementGroupSuccess
  );
}

function* createMeasurementName({ projectID }) {
  const name = { value: 'Untitled' };
  yield sagas.post(
    nameUrl(projectID),
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
    url(project.get('id')),
    { measurements },
    actions.updateMeasurementsSuccess
  );
}

function* deleteMeasurementGroup({ id }) {
  const project = yield select(selectProject());
  yield sagas.destroy(
    groupUrl(project.get('id')),
    { id },
    actions.deleteMeasurementGroupSuccess
  );
}

function* deleteMeasurementName({ id }) {
  const project = yield select(selectProject());
  yield sagas.destroy(
    nameUrl(project.get('id')),
    { id },
    actions.deleteMeasurementNameSuccess
  );
}

const url = (id) => `projects/${id}/measurements`;
const groupUrl = (id) => `projects/${id}/measurement_groups`;
const nameUrl = (id) => `projects/${id}/measurement_names`;

function* resetForm() {
  const m = yield select(selectMeasurements());
  yield put(initialize('Measurements', m, { form: 'Measurements' }));
}
