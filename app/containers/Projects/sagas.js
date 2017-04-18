// this file is injected via routes.js
// it's basically just asynchronous stuff, but writen in a way which looks synchronous,
// and yet doesn't prevent the rest of the app from running until it's finished

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './constants';
import { projectsLoaded } from './actions';

export function* loadProjects() {
  const requestURL = 'http://localhost:4000/projects';
  try {
    const projects = yield call(request, requestURL);
    yield put(projectsLoaded(projects)); 
  } catch (err) {
    console.log(err);
  }
}

export function* projectData() {
  // Watcher saga
  yield takeLatest(types.LOAD_PROJECTS, loadProjects); 
}

// Bootstrap sagas
export default [
  projectData,
];


