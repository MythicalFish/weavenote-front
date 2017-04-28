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

export function archiveProject(id) {
  return {
    type: types.ARCHIVE_PROJECT,
    id,
  };
}

export function archiveProjectSuccess(list) {
  return {
    type: types.ARCHIVE_PROJECT_SUCCESS,
    list,
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

export function changeSection(section) {
  return {
    type: types.CHANGE_SECTION,
    section,
  };
}
