
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
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
    const data = yield call(API.post, 'projects', { project: { name: 'Untitled project' } });
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
    const data = yield call(API.patch, `projects/${id}`, { project: { archived }, index_after_update: true });
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

export function* fetchProjects(action) {
  const { params } = action;
  try {
    const projects = yield call(API.get, 'projects', params);
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
