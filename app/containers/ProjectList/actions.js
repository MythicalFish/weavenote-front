import * as types from './constants/actions';

export function listProjects(params) {
  return {
    type: types.LIST_PROJECTS,
    params,
  };
}

export function listProjectsSuccess(list) {
  return {
    type: types.LIST_PROJECTS_SUCCESS,
    list,
  };
}

export function listProjectsError(error) {
  return {
    type: types.LIST_PROJECTS_ERROR,
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