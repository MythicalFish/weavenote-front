
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { request, send, patch } from 'utils/request';
import * as types from './constants/actions';
import {
  listProjectsSuccess, createProjectSuccess,
  archiveProjectSuccess,
} from './actions';

export default [
  listProjectsWatcher,
  createProjectWatcher,
  archiveProjectWatcher,
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

export function* archiveProject(action) {
  try {
    const data = yield call(patch, { path: `projects/${action.id}`, body: { archived: true, index_after_update: true } });
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
