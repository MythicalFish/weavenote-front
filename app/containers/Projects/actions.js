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

export function getProject(id) {
  return {
    type: types.GET_PROJECT,
    id,
  };
}

export function getProjectSuccess(project) {
  return {
    type: types.GET_PROJECT_SUCCESS,
    project,
  };
}
