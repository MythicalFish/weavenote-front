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

export function showBasics(id) {
  return {
    type: types.SHOW_BASICS,
    id,
  };
}

export function showBasicsSuccess(data) {
  return {
    type: types.SHOW_BASICS_SUCCESS,
    data,
  };
}
