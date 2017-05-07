
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { request, send, patch } from 'utils/request';
import * as types from './constants/actions';
import {
  fetchProjectsSuccess, createProjectSuccess,
  fileProjectSuccess,
} from './actions';

export default [
  fetchProjectsWatcher,
  createProjectWatcher,
  fileProjectWatcher,
];

export function* createProject() {
  try {
    const data = yield call(send, { path: 'projects', body: { project: { name: 'Untitled project' } } });
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

export function* fileProject(action) {
  const { id, archived } = action.payload;
  try {
    const data = yield call(patch, { path: `projects/${id}`, body: { project: { archived }, index_after_update: true } });
    yield put(fileProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fileProjectWatcher() {
  const watcher = yield takeLatest(types.FILE_PROJECT, fileProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchProjects(opts) {
  try {
    const projects = yield call(request, { path: 'projects', params: opts.params });
    yield put(fetchProjectsSuccess(projects));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
export function* fetchProjectsWatcher() {
  const watcher = yield takeLatest(types.FETCH_PROJECTS, fetchProjects);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
