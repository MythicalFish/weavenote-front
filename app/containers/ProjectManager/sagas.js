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
  yield sagas.fetchEntity('project', action.id, actions.fetchProjectSuccess);
}

export function* updateProject(action) {
  yield sagas.updateEntity('project', action.project.toJS(), actions.updateProjectSuccess);
}


/*
 *
 *  Image
 *
 */

export function* fetchImages(action) {
  yield sagas.fetchEntities({ url: `projects/${action.projectID}/images` }, actions.fetchImagesSuccess);
}

export function* createImage(action) {
  yield sagas.createEntity(
    {
      url: `projects/${action.data.project_id}/images`,
      name: 'image',
    },
    action.data.image,
    actions.createImageSuccess
  );
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
  let component = action.component.toJS();
  try {
    component = yield call(API.patch, `projects/${component.project_id}/components/${component.id}`, { component });
    yield put(actions.updateComponentSuccess(component));
    yield put(actions.fetchMaterialCost(component));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createComponent({ payload }) {
  let component = { material_id: payload.materialID };
  try {
    component = yield call(API.post, `projects/${payload.projectID}/components`, { component });
    yield put(actions.createComponentSuccess(component));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* deleteComponent(action) {
  try {
    const components = yield call(API.destroy, `projects/${action.projectID}/components/${action.id}`);
    yield put(actions.deleteComponentSuccess(components));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* doFetchMaterialCost(action) {
  const component = action.component;
  try {
    const data = yield call(API.get, `projects/${component.project_id}/material_cost`);
    yield put(actions.fetchMaterialCostSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
