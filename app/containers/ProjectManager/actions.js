import * as types from './constants';

/*
 *
 *  Project attributes
 *
 */

export function fetchProject(id) {
  return { type: types.FETCH_PROJECT, id };
}
export function fetchProjectSuccess(data) {
  return { type: types.FETCH_PROJECT_SUCCESS, data };
}

export function updateProject(payload) {
  return { type: types.UPDATE_PROJECT, payload };
}
export function updateProjectSuccess() {
  return { type: types.UPDATE_PROJECT_SUCCESS };
}

/*
 *
 *  Project components (materials)
 *
 */

export function fetchComponents(id) {
  return { type: types.FETCH_COMPONENTS, id };
}

export function fetchComponentsSuccess(components) {
  return { type: types.FETCH_COMPONENTS_SUCCESS, components };
}

/*
 *
 *  Project images
 *
 */

export function createImage(payload) {
  return { type: types.CREATE_IMAGE, payload };
}

export function createImageSuccess(payload) {
  return { type: types.CREATE_IMAGE_SUCCESS, payload };
}

export function changeImage(payload) {
  return { type: types.SELECT_IMAGE, payload };
}
