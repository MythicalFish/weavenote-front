import { take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import { selectProject } from '../ProjectManager/selectors';

export function* ProjectMeasurementsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MEASUREMENTS, fetchMeasurements),
    yield takeLatest(types.UPDATE_MEASUREMENTS, updateMeasurements),
    yield takeLatest(types.CREATE_MEASUREMENT_GROUP, createMeasurementGroup),
    yield takeLatest(types.CREATE_MEASUREMENT_NAME, createMeasurementName),
    yield takeLatest(types.DELETE_MEASUREMENT_GROUP, deleteMeasurementGroup),
    yield takeLatest(types.DELETE_MEASUREMENT_NAME, deleteMeasurementName),
    yield takeLatest(types.REORDER_MEASUREMENTS, reorderMeasurements),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

const url = (id) => `projects/${id}/measurements`;
const groupUrl = (id) => `projects/${id}/measurement_groups`;
const nameUrl = (id) => `projects/${id}/measurement_names`;

function* fetchMeasurements() {
  const project = yield select(selectProject());
  yield sagas.get(
    url(project.get('id')),
    null,
    actions.fetchMeasurementsSuccess
  );
}

function* createMeasurementGroup({ projectID }) {
  yield sagas.post(
    groupUrl(projectID),
    null,
    actions.createMeasurementGroupSuccess
  );
}

function* createMeasurementName({ projectID }) {
  yield sagas.post(
    nameUrl(projectID),
    null,
    actions.createMeasurementNameSuccess
  );
}

function* updateMeasurements({ payload }) {
  const project = yield select(selectProject());
  yield sagas.patch(
    url(project.get('id')),
    { measurements: payload },
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

function* reorderMeasurements({ payload: measurements }) {
  const project = yield select(selectProject());
  yield sagas.patch(
    url(project.get('id')),
    { measurements },
    actions.updateMeasurementsSuccess
  );
}
