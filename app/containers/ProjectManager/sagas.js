import { call, put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as sagas from 'utils/genericSagas';
import { materialListWatcher } from 'containers/MaterialList/sagas';
import * as types from './constants';
import * as actions from './actions';
export default [projectManagerWatcher, materialListWatcher];

export function* projectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),

    yield takeLatest(types.FETCH_IMAGES, fetchImages),
    yield takeLatest(types.CREATE_IMAGE, createImage),
    yield takeLatest(types.DELETE_IMAGE, deleteImage),

    yield takeLatest(types.FETCH_COMPONENTS, fetchComponents),
    yield takeLatest(types.UPDATE_COMPONENT, updateComponent),
    yield takeLatest(types.CREATE_COMPONENT, createComponent),
    yield takeLatest(types.DELETE_COMPONENT, deleteComponent),
    yield takeLatest(types.FETCH_MATERIAL_COST, doFetchMaterialCost),

  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

/*
 *
 *  Project
 *
 */

export function* fetchProject(action) {
  yield sagas.fetchEntity(`projects/${action.id}`, actions.fetchProjectSuccess);
}

export function* updateProject(action) {
  const project = action.project.toJS();
  yield sagas.updateEntity(`projects/${project.id}`, { project }, actions.updateProjectSuccess);
}


/*
 *
 *  Image
 *
 */

export function* fetchImages(action) {
  yield sagas.fetchEntities(`projects/${action.projectID}/images`, actions.fetchImagesSuccess);
}

export function* createImage(action) {
  const { image } = action.data;
  yield sagas.createEntity(`projects/${image.project_id}/images`, { image }, actions.createImageSuccess);
}

export function* deleteImage(action) {
  yield sagas.destroyEntity(`projects/${action.projectID}/images/${action.id}`, actions.deleteImageSuccess);
}

/*
 *
 *  Components
 *
 */

export function* fetchComponents(action) {
  yield sagas.fetchEntities(`projects/${action.projectID}/components`, actions.fetchComponentsSuccess);
}

export function* updateComponent(action) {
  const component = action.component.toJS();
  yield sagas.updateEntity(
    `projects/${component.project_id}/components/${component.id}`,
    { component },
    [actions.updateProjectSuccess, actions.fetchMaterialCost],
  );
}

export function* createComponent({ payload }) {
  const component = { material_id: payload.materialID };
  yield sagas.createEntity(`projects/${payload.projectID}/components`, { component }, actions.createComponentSuccess);
}

export function* deleteComponent(action) {
  yield sagas.destroyEntity(`projects/${action.projectID}/components/${action.id}`, actions.deleteComponentSuccess);
}

export function* doFetchMaterialCost(action) {
  const component = action.component;
  yield sagas.fetchEntities(`projects/${component.project_id}/material_cost`, actions.fetchMaterialCostSuccess);
}


