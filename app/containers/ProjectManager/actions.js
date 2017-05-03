import * as types from './constants';

export function fetchProject(id) {
  return {
    type: types.SHOW_PROJECT,
    id,
  };
}

export function fetchProjectSuccess(data) {
  return {
    type: types.SHOW_PROJECT_SUCCESS,
    data,
  };
}

/*
 *
 *  Basics
 *
 */

export function updateProject(payload) {
  return {
    type: types.UPDATE_PROJECT,
    payload,
  };
}

export function updateProjectSuccess() {
  return {
    type: types.UPDATE_PROJECT_SUCCESS,
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
