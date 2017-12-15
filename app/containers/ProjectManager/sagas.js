import { take, cancel, takeLatest, select, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getFormValues, isDirty, initialize } from 'redux-form/immutable';
import * as sagas from 'utils/genericSagas';
import { ProjectInstructionsWatcher } from '../ProjectInstructions/sagas';
import { ProjectMeasurementsWatcher } from '../ProjectMeasurements/sagas';
import { ProjectComponentsWatcher } from '../ProjectComponents/sagas';
import { ProjectAnnotationsWatcher } from '../ProjectAnnotations/sagas';
import { ProjectExportWatcher } from '../ProjectExport/sagas';
import { selectPreferredCurrency } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { UPDATE_MATERIAL_SUCCESS } from '../MaterialManager/constants';
import { SWITCH_CURRENCY } from '../App/constants';
import { selectProjectID } from './selectors';

export default [
  ProjectManagerWatcher,
  ProjectInstructionsWatcher,
  ProjectMeasurementsWatcher,
  ProjectComponentsWatcher,
  ProjectAnnotationsWatcher,
  ProjectExportWatcher,
];

function* ProjectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),
    yield takeLatest(types.FETCH_MATERIAL_COST, fetchMaterialCost),
    yield takeLatest(UPDATE_MATERIAL_SUCCESS, fetchMaterialCost),
    yield takeLatest(SWITCH_CURRENCY, fetchMaterialCost),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchProject(action) {
  yield sagas.get(`projects/${action.id}`, null, actions.fetchProjectSuccess);
}

function* fetchMaterialCost() {
  const projectID = yield select(selectProjectID());
  const currency = yield select(selectPreferredCurrency());
  const params = { currency: currency.get('id') };
  yield sagas.get(
    `projects/${projectID}/material_cost`,
    params,
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
