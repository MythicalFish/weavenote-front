
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [projectListWatcher];

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
  yield sagas.createEntity('projects', { project: { name: 'Untitled project' } }, actions.createProjectSuccess);
}

export function* fileProject(action) {
  const { id, archived } = action.payload;
  const params = { project: { id, archived }, index_after_update: true };
  yield sagas.updateEntity(`projects/${id}`, params, actions.fileProjectSuccess);
}

export function* fetchProjects(action) {
  yield sagas.fetchEntities('projects', actions.fetchProjectsSuccess, action.params);
}
