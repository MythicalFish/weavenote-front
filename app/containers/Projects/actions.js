import * as types from './constants';

export function listProjects() {
  return {
    type: types.LIST_PROJECTS,
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

export function showProject(id) {
  return {
    type: types.SHOW_PROJECT,
    id,
  };
}

export function showProjectSuccess(data) {
  return {
    type: types.SHOW_PROJECT_SUCCESS,
    data,
  };
}

export function updateProject(data) {
  return {
    type: types.UPDATE_PROJECT,
    data,
  };
}

export function updateProjectSuccess(id) {
  return {
    type: types.UPDATE_PROJECT_SUCCESS,
    id,
  };
}
