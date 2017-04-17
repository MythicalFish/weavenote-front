import request from 'utils/request';
import { call, put } from 'redux-saga/effects';
import { projectsLoaded, projectLoadingError } from './actions';

export function* loadProjects() {
  const requestURL = 'http://localhost:4000/projects';

  try {
    const projects = yield call(request, requestURL);
    yield put(projectsLoaded(projects));
  } catch (err) {
    yield put(projectLoadingError(err));
  }
}


// All sagas to be loaded
export default [
  loadProjects,
];
