// this file is injected via routes.js
// it's basically just asynchronous stuff, but writen in a way which looks synchronous,
// and yet doesn't prevent the rest of the app from running until it's finished

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_PROJECTS } from './constants';
import { projectsLoaded } from './actions';

export function* loadProjects() {
  const requestURL = 'http://localhost:4000/projects';

  try {
    const projects = yield call(request, requestURL);
    yield put(projectsLoaded(projects)); // executes when 'projects' is ready
    // end result is a "put" "effect (saga) description" with:
    // { type: LOAD_PROJECTS_SUCCESS, projects: [the projects] }
  } catch (err) {
    console.log(err);
  }
}

export function* projectData() {
  yield takeLatest(LOAD_PROJECTS, loadProjects); // Spawns the saga
}

// Bootstrap sagas
export default [
  projectData,
];


