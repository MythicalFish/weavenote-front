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

export function updateProject(project) {
  return { type: types.UPDATE_PROJECT, project };
}
export function updateProjectSuccess() {
  return { type: types.UPDATE_PROJECT_SUCCESS };
}

/*
 *
 *  Project components (materials)
 *
 */

export function fetchComponents(projectID) {
  return { type: types.FETCH_COMPONENTS, projectID };
}

export function fetchComponentsSuccess(components) {
  return { type: types.FETCH_COMPONENTS_SUCCESS, components };
}

export function updateComponent(component) {
  return { type: types.UPDATE_COMPONENT, component };
}

export function updateComponentSuccess() {
  return { type: types.UPDATE_COMPONENT_SUCCESS };
}

export function createComponent(projectID) {
  return { type: types.CREATE_COMPONENT, projectID };
}

export function createComponentSuccess(component) {
  return { type: types.CREATE_COMPONENT_SUCCESS, component };
}

export function deleteComponent({ projectID, id }) {
  return { type: types.DELETE_COMPONENT, projectID, id };
}

export function deleteComponentSuccess(components) {
  return { type: types.DELETE_COMPONENT_SUCCESS, components };
}

export function switchComponent(component) {
  return { type: types.SWITCH_COMPONENT, component };
}

/*
 *
 *  Project images
 *
 */

export function fetchImages(projectID) {
  return { type: types.FETCH_IMAGES, projectID };
}

export function fetchImagesSuccess(images) {
  return { type: types.FETCH_IMAGES_SUCCESS, images };
}

export function updateImage({ projectID, imageID }) {
  return { type: types.UPDATE_IMAGE, projectID, imageID };
}

export function updateImageSuccess() {
  return { type: types.UPDATE_IMAGE_SUCCESS };
}

export function createImage(data) {
  return { type: types.CREATE_IMAGE, data };
}

export function createImageSuccess(image) {
  return { type: types.CREATE_IMAGE_SUCCESS, image };
}

export function deleteImage({ projectID, id }) {
  return { type: types.DELETE_IMAGE, projectID, id };
}

export function deleteImageSuccess(images) {
  return { type: types.DELETE_IMAGE_SUCCESS, images };
}

export function switchImage(index) {
  return { type: types.SWITCH_IMAGE, index };
}
