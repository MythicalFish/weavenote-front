
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as types from './constants';
import {
  fetchProjectsSuccess, createProjectSuccess,
  fileProjectSuccess,
} from './actions';

export default [
  projectListWatcher,
];

export function* projectListWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_PROJECT, createProject),
    yield takeLatest(types.FILE_PROJECT, fileProject),
    yield takeLatest(types.FETCH_PROJECTS, fetchProjects),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* createProject() {
  try {
    const data = yield call(API.post, 'projects', { project: { name: 'Untitled project' } });
    yield put(createProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
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

export function* fetchProjects(action) {
  const { params } = action;
  try {
    const projects = yield call(API.get, 'projects', params);
    yield put(fetchProjectsSuccess(projects));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
