import { take, cancel, takeLatest, select, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getFormValues, isDirty, initialize } from 'redux-form/immutable';
import * as sagas from 'utils/genericSagas';
import { ProjectInstructionsWatcher } from '../ProjectInstructions/sagas';
import { ProjectMeasurementsWatcher } from '../ProjectMeasurements/sagas';
import { ProjectComponentsWatcher } from '../ProjectComponents/sagas';
import { ProjectAnnotationsWatcher } from '../ProjectAnnotations/sagas';
import * as types from './constants';
import * as actions from './actions';

export default [
  ProjectManagerWatcher,
  ProjectInstructionsWatcher,
  ProjectMeasurementsWatcher,
  ProjectComponentsWatcher,
  ProjectAnnotationsWatcher,
];

function* ProjectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),
    yield takeLatest(types.FETCH_MATERIAL_COST, fetchMaterialCost),
    yield takeLatest(types.EXPORT_PDF, exportPDF),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchProject(action) {
  yield sagas.get(`projects/${action.id}`, null, actions.fetchProjectSuccess);
}

function* fetchMaterialCost(action) {
  yield sagas.get(
    `projects/${action.id}/material_cost`,
    null,
    actions.fetchMaterialCostSuccess
  );
}

function* updateProject() {
  const dirty = yield select(isDirty('ProjectForm'));
  if (!dirty) return;
  const project = yield select(getFormValues('ProjectForm'));
  yield sagas.patch(
    `projects/${project.get('id')}`,
    { project },
    actions.updateProjectSuccess
  );
  yield put(initialize('ProjectForm', project));
}

function* exportPDF({ id }) {
  yield sagas.get(`projects/${id}/export`, null, actions.exportPDFsuccess);
}
