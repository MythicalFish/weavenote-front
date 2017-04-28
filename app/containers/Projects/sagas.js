
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { request, send, patch } from 'utils/request';
import * as types from './constants/actions';
import {
  listProjectsSuccess, showProjectSuccess, createProjectSuccess,
  archiveProjectSuccess,
} from './actions';

export default [
  listProjectsWatcher,
  showProjectWatcher,
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
  /*
   * WATCHER SAGA
   *
   * When the index.js does dispatch(listProjects()),
   * all it does is emit an action called LIST_PROJECTS,
   * it DOES NOT call the above function directly.
   *
   * The reducer.js sees the action and updates the state (loading: true, etc.)
   * This watcher also sees the action, and then actually does the above function
   *
   * On success, it dispatches a new action with put(listProjectsSuccess(projects))
   * Which is the same as put({type:LIST_PROJECTS_SUCCESS, projects:projects})
   * This is seen by the reducer.js, and the state is updated again
   *
   * When the state has been given the projects, the selector sees it,
   * and the projects are finally rendered on the page.
   *
   * Yay I understand this!
  */
  const watcher = yield takeLatest(types.LIST_PROJECTS, listProjects);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
