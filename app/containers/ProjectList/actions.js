import * as types from './constants';

export function fetchProjects(params) {
  return {
    type: types.FETCH_PROJECTS,
    params,
  };
}

export function fetchProjectsSuccess(list) {
  return {
    type: types.FETCH_PROJECTS_SUCCESS,
    list,
  };
}

export function fetchProjectsError(error) {
  return {
    type: types.FETCH_PROJECTS_ERROR,
    error,
  };
}

export function createProject() {
  return {
    type: types.CREATE_PROJECT,
  };
}

export function createProjectSuccess(list) {
  return {
    type: types.CREATE_PROJECT_SUCCESS,
    list,
  };
}

export function fileProject(payload) {
  return {
    type: types.FILE_PROJECT,
    payload,
  };
}

export function fileProjectSuccess(list) {
  return {
    type: types.FILE_PROJECT_SUCCESS,
    list,
  };
}