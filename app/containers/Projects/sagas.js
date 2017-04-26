// this file is injected via routes.js
// it's basically just asynchronous stuff, but writen in a way which looks synchronous,
// and yet doesn't prevent the rest of the app from running until it's finished

import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import * as types from './constants/actions';
import { listProjectsSuccess, showProjectSuccess } from './actions';

export function* listProjects() {
  try {
    const projects = yield call(request, 'projects');
    yield put(listProjectsSuccess(projects));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* showProject(action) {
  try {
    const data = yield call(request, `projects/${action.id}`);
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

// Bootstrap sagas
export default [
  listProjectsWatcher,
  showProjectWatcher,
];
