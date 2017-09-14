import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [projectListWatcher];

export function* projectListWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_PROJECT, createProject),
    yield takeLatest(types.CREATE_PROJECT_SUCCESS, showProject),
    yield takeLatest(types.DELETE_PROJECT, deleteProject),
    yield takeLatest(types.FILE_PROJECT, fileProject),
    yield takeLatest(types.FETCH_PROJECTS, fetchProjects),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createProject() {
  yield sagas.post(
    'projects',
    { project: { name: 'Untitled project' } },
    actions.createProjectSuccess
  );
}

function* deleteProject({ id }) {
  yield sagas.destroy(`projects/${id}`, null, actions.deleteProjectSuccess);
}

function* fileProject(action) {
  const { id, archived } = action.payload;
  const params = { project: { id, archived }, index_after_update: true };
  yield sagas.patch(`projects/${id}`, params, actions.fileProjectSuccess);
}

function* fetchProjects(action) {
  yield sagas.get('projects', action.params, actions.fetchProjectsSuccess);
}

function* showProject({ response }) {
  browserHistory.push(`/projects/${response[0].id}`);
}
