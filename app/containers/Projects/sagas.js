import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_PROJECTS } from './constants';
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
  yield takeLatest(LOAD_PROJECTS, loadProjects);
}

// Bootstrap sagas
export default [
  projectData,
];
