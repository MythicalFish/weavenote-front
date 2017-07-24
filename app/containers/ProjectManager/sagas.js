import { put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import { materialListWatcher } from 'containers/MaterialList/sagas';
import * as types from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

export default [projectManagerWatcher, materialListWatcher];

export function* projectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),
    yield takeLatest(types.FETCH_MATERIAL_COST, fetchMaterialCost),

    //    yield takeLatest(imgActions.SWITCH_IMAGE, resetImageForm),
    //    yield takeLatest(imgActions.DELETE_IMAGE_SUCCESS, resetImageForm),
    //    yield takeLatest(imgActions.CREATE_IMAGE_SUCCESS, resetImageForm),
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

// function* resetImageForm() {
//   const i = yield select(selectors.selectCurrentImage());
//   yield put(initialize('ImageForm', i, { form: 'ImageForm' }));
// }
