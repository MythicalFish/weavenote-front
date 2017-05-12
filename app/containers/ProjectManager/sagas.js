import { call, put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import { materialListWatcher } from 'containers/MaterialList/sagas';
import * as types from './constants';
import {
  fetchProjectSuccess, updateProjectSuccess,
  fetchImagesSuccess, updateImageSuccess, createImageSuccess, deleteImageSuccess,
  fetchComponentsSuccess, updateComponentSuccess, createComponentSuccess, deleteComponentSuccess,
  fetchMaterialCostSuccess,
} from './actions';


export default [
  projectManagerWatcher,
  materialListWatcher,
];

export function* projectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),

    yield takeLatest(types.FETCH_IMAGES, fetchImages),
    yield takeLatest(types.UPDATE_IMAGE, updateImage),
    yield takeLatest(types.CREATE_IMAGE, createImage),
    yield takeLatest(types.DELETE_IMAGE, deleteImage),

    yield takeLatest(types.FETCH_COMPONENTS, fetchComponents),
    yield takeLatest(types.UPDATE_COMPONENT, updateComponent),
    yield takeLatest(types.CREATE_COMPONENT, createComponent),
    yield takeLatest(types.DELETE_COMPONENT, deleteComponent),
    yield takeLatest(types.FETCH_MATERIAL_COST, fetchMaterialCost),

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
  try {
    const data = yield call(API.get, `projects/${action.id}`);
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* updateProject(action) {
  const project = action.project.toJS();
  try {
    yield call(API.patch, `projects/${project.id}`, { project });
    yield put(updateProjectSuccess());
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}


/*
 *
 *  Image
 *
 */

export function* fetchImages(action) {
  try {
    const images = yield call(API.get, `projects/${action.projectID}/images`);
    yield put(fetchImagesSuccess(images));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* updateImage(action) {
  const { image } = action;
  try {
    yield call(API.patch, `projects/${image.project_id}/images/${image.id}`, { image });
    yield put(updateImageSuccess());
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createImage(action) {
  const { image } = action.data;
  try {
    const response = yield call(API.post, `projects/${image.project_id}/images`, { image });
    yield put(createImageSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* deleteImage(action) {
  try {
    const images = yield call(API.destroy, `projects/${action.projectID}/images/${action.id}`);
    yield put(deleteImageSuccess(images));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/*
 *
 *  Components
 *
 */

export function* fetchComponents(action) {
  try {
    const components = yield call(API.get, `projects/${action.projectID}/components`);
    yield put(fetchComponentsSuccess(components));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* updateComponent(action) {
  const component = action.component.toJS();
  try {
    yield call(API.patch, `projects/${component.project_id}/components/${component.id}`, { component });
    yield put(updateComponentSuccess());
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createComponent({ payload }) {
  let component = { material_id: payload.materialID };
  try {
    component = yield call(API.post, `projects/${payload.projectID}/components`, { component });
    yield put(createComponentSuccess(component));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* deleteComponent(action) {
  try {
    const components = yield call(API.destroy, `projects/${action.projectID}/components/${action.id}`);
    yield put(deleteComponentSuccess(components));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchMaterialCost(action) {
  const component = action.component.toJS();
  try {
    const data = yield call(API.get, `projects/${component.project_id}/material_cost`);
    yield put(fetchMaterialCostSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}