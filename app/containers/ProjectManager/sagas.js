import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as types from './constants';
import {
  fetchProjectSuccess, updateProjectSuccess,
  fetchImagesSuccess, updateImageSuccess, createImageSuccess, deleteImageSuccess,
  fetchComponentsSuccess, updateComponentSuccess, createComponentSuccess, deleteComponentSuccess,
} from './actions';

export default [

  fetchProjectWatcher,
  updateProjectWatcher,

  fetchImagesWatcher,
  updateImageWatcher,
  createImageWatcher,
  deleteImageWatcher,

  fetchComponentsWatcher,
  updateComponentWatcher,
  createComponentWatcher,
  deleteComponentWatcher,

];

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

export function* fetchProjectWatcher() {
  const watcher = yield takeLatest(types.FETCH_PROJECT, fetchProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* updateProjectWatcher() {
  const watcher = yield takeLatest(types.UPDATE_PROJECT, updateProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* fetchImagesWatcher() {
  const watcher = yield takeLatest(types.FETCH_IMAGES, fetchImages);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* updateImageWatcher() {
  const watcher = yield takeLatest(types.UPDATE_IMAGE, updateImage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* createImageWatcher() {
  const watcher = yield takeLatest(types.CREATE_IMAGE, createImage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteImage(action) {
  try {
    const images = yield call(API.destroy, `projects/${action.projectID}/images/${action.id}`);
    yield put(deleteImageSuccess(images));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* deleteImageWatcher() {
  const watcher = yield takeLatest(types.DELETE_IMAGE, deleteImage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* fetchComponentsWatcher() {
  const watcher = yield takeLatest(types.FETCH_COMPONENTS, fetchComponents);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
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

export function* updateComponentWatcher() {
  const watcher = yield takeLatest(types.UPDATE_COMPONENT, updateComponent);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* createComponent(action) {
  try {
    const component = yield call(API.post, `projects/${action.projectID}/component`, { component });
    yield put(createComponentSuccess(component));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createComponentWatcher() {
  const watcher = yield takeLatest(types.CREATE_COMPONENT, createComponent);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteComponent(action) {
  try {
    const components = yield call(API.destroy, `projects/${action.projectID}/components/${action.id}`);
    yield put(deleteComponentSuccess(components));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* deleteComponentWatcher() {
  const watcher = yield takeLatest(types.DELETE_COMPONENT, deleteComponent);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}