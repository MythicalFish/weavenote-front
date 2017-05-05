import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { send, request, patch, del } from 'utils/request';
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
    const data = yield call(request, { path: `projects/${action.id}` });
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
    yield call(patch, { path: `projects/${project.id}`, body: project });
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
    const images = yield call(request, { path: `projects/${action.projectID}/images` });
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
  const { payload } = action;
  try {
    yield call(patch, { path: `projects/${payload.projectID}/images/${payload.id}`, body: payload });
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
  try {
    const image = yield call(send, { path: `projects/${action.projectID}/images`, body: { url: action.imageURL } });
    yield put(createImageSuccess(image));
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
    const images = yield call(del, { path: `projects/${action.projectID}/images/${action.id}` });
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
    const components = yield call(request, { path: `projects/${action.projectID}/components` });
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
  const { payload } = action;
  try {
    yield call(patch, { path: `projects/${payload.projectID}/components/${payload.id}`, body: payload });
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
    const component = yield call(send, { path: `projects/${action.projectID}/component`, body: { url: action.componentURL } });
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
    const components = yield call(del, { path: `projects/${action.projectID}/components/${action.id}` });
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