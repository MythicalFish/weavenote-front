import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import { materialListWatcher } from 'containers/MaterialList/sagas';
import * as types from './constants';
import * as actions from './actions';

export default [projectManagerWatcher, materialListWatcher];

export function* projectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),
    yield takeLatest(types.FETCH_MATERIAL_COST, fetchMaterialCost),
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

function* updateProject(action) {
  const project = action.project.toJS();
  yield sagas.patch(
    `projects/${project.id}`,
    { project },
    actions.updateProjectSuccess
  );
}
