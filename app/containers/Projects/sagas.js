
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { request, send, patch } from 'utils/request';
import * as types from './constants/actions';
import {
  listProjectsSuccess, showProjectSuccess, createProjectSuccess,
  archiveProjectSuccess, createImageSuccess,
} from './actions';

export default [
  listProjectsWatcher,
  showProjectWatcher,
  createProjectWatcher,
  archiveProjectWatcher,
  createImageWatcher,
];

export function* createProject() {
  try {
    const data = yield call(send, { path: 'projects', body: { name: 'Untitled project' } });
    yield put(createProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createProjectWatcher() {
  const watcher = yield takeLatest(types.CREATE_PROJECT, createProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

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

export function* archiveProject(action) {
  try {
    const data = yield call(patch, { path: `projects/${action.id}`, body: { archived: true, index_after_update: true } });
    console.log(data)
    yield put(archiveProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* archiveProjectWatcher() {
  const watcher = yield takeLatest(types.ARCHIVE_PROJECT, archiveProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* showProject(action) {
  try {
    const data = yield call(request, { path: `projects/${action.id}` });
    yield put(showProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* showProjectWatcher() {
  const watcher = yield takeLatest(types.SHOW_PROJECT, showProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* listProjects(opts) {
  try {
    const projects = yield call(request, { path: 'projects', params: opts.params });
    yield put(listProjectsSuccess(projects));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
export function* listProjectsWatcher() {
  const watcher = yield takeLatest(types.LIST_PROJECTS, listProjects);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
