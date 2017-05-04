import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { send, request, patch } from 'utils/request';
import * as types from './constants';
import {
  createImageSuccess, fetchProjectSuccess, updateProjectSuccess,
  fetchComponentsSuccess,
} from './actions';

export default [
  fetchProjectWatcher,
  updateProjectWatcher,
  createImageWatcher,
  fetchComponentsWatcher,
];

/*
 *
 *  Image
 *
 */

export function* createImage(action) {
  const { payload } = action;
  try {
    const image = yield call(send, { path: `projects/${payload.projectID}/create_image`, body: { url: payload.imageURL } });
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

/*
 *
 *  Fetch
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

export function* fetchComponents(action) {
  try {
    const data = yield call(request, { path: `projects/${action.id}/components` });
    yield put(fetchComponentsSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchComponentsWatcher() {
  const watcher = yield takeLatest(types.FETCH_COMPONENTS, fetchComponents);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


/*
 *
 *  Update
 *
 */

export function* updateProject(action) {
  const { payload } = action;
  const id = payload.get('id');
  const data = payload.delete('id');
  try {
    yield call(patch, { path: `projects/${id}`, body: data });
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
