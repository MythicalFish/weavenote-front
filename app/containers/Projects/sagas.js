// this file is injected via routes.js
// it's basically just asynchronous stuff, but writen in a way which looks synchronous,
// and yet doesn't prevent the rest of the app from running until it's finished

import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import * as types from 'containers/App/constants';
import { projectsLoaded } from 'containers/App/actions';

export function* loadProjects() {
  const requestURL = 'http://localhost:4000/projects';
  try {
    const projects = yield call(request, requestURL);
    yield put(projectsLoaded(projects));
  } catch (err) {
    console.error(err);
  }
}

export function* projectData() {
  /*
   * WATCHER SAGA
   *
   * When the index.js does dispatch(loadProjects()),
   * all it does is emit an action called LOAD_PROJECTS,
   * it DOES NOT call the above function directly.
   *
   * The reducer.js sees the action and updates the state (loading: true, etc.)
   * This watcher also sees the action, and then actually does the above function
   *
   * On success, it dispatches a new action with put(projectsLoaded(projects))
   * Which is the same as put({type:LOAD_PROJECTS_SUCCESS, projects:projects})
   * This is seen by the reducer.js, and the state is updated again
   *
   * When the state has been given the projects, the selector sees it,
   * and the projects are finally rendered on the page.
   *
   * Yay I understand this!
  */
  const watcher = yield takeLatest(types.LOAD_PROJECTS, loadProjects); 
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  projectData,
];


