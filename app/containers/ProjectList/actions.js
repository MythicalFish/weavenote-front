import * as types from './constants';

export function fetchProjects(params) {
  return { type: types.FETCH_PROJECTS, params };
}

export function fetchProjectsSuccess(response) {
  return { type: types.FETCH_PROJECTS_SUCCESS, response };
}

export function fetchProjectsError(error) {
  return { type: types.FETCH_PROJECTS_ERROR, error };
}

export function createProject() {
  return { type: types.CREATE_PROJECT };
}

export function createProjectSuccess(response) {
  return { type: types.CREATE_PROJECT_SUCCESS, response };
}

export function deleteProject(id) {
  return { type: types.DELETE_PROJECT, id };
}

export function deleteProjectSuccess(response) {
  return { type: types.DELETE_PROJECT_SUCCESS, response };
}

export function fileProject(payload) {
  return { type: types.FILE_PROJECT, payload };
}

export function fileProjectSuccess(response) {
  return { type: types.FILE_PROJECT_SUCCESS, response };
}

export function duplicateProject(id) {
  return { type: types.DUPLICATE_PROJECT, id };
}

export function duplicateProjectSuccess(response) {
  return { type: types.DUPLICATE_PROJECT_SUCCESS, response };
}

export function filterProjects(text) {
  return { type: types.FILTER_PROJECTS, text };
}
