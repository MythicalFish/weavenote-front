// this file is injected via routes.js
// it's basically just asynchronous stuff, but writen in a way which looks synchronous,
// and yet doesn't prevent the rest of the app from running until it's finished

import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import * as types from './constants';
import { projectsLoaded } from './actions';

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
  // Watcher saga
  const watcher = yield takeLatest(types.LOAD_PROJECTS, loadProjects); 
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  projectData,
];


