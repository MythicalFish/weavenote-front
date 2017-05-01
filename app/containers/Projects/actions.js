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

/*
 *
 *  Basics
 *
 */

export function updateBasics(data) {
  return {
    type: types.UPDATE_BASICS,
    data,
  };
}

export function updateBasicsSuccess(id) {
  return {
    type: types.UPDATE_BASICS_SUCCESS,
    id,
  };
}

/*
 *
 *  Images
 *
 */

export function createImage(payload) {
  return {
    type: types.CREATE_IMAGE,
    payload,
  };
}

export function createImageSuccess(payload) {
  return {
    type: types.CREATE_IMAGE_SUCCESS,
    payload,
  };
}

export function changeImage(payload) {
  return {
    type: types.SELECT_IMAGE,
    payload,
  };
}

/*
 *
 *  Sections
 *
 */


export function changeSection(section) {
  return {
    type: types.CHANGE_SECTION,
    section,
  };
}
