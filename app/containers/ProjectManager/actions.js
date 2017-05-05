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

export function fetchComponents(projectID) {
  return { type: types.FETCH_COMPONENTS, projectID };
}

export function fetchComponentsSuccess(components) {
  return { type: types.FETCH_COMPONENTS_SUCCESS, components };
}

export function updateComponent({ projectID, componentID }) {
  return { type: types.UPDATE_COMPONENT, projectID, componentID };
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

export function deleteComponent({ projectID, componentID }) {
  return { type: types.DELETE_COMPONENT, projectID, componentID };
}

export function deleteComponentSuccess(components) {
  return { type: types.DELETE_COMPONENT_SUCCESS, components };
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

export function createImage({ projectID, imageURL }) {
  return { type: types.CREATE_IMAGE, projectID, imageURL };
}

export function createImageSuccess(image) {
  return { type: types.CREATE_IMAGE_SUCCESS, image };
}

export function deleteImage({ projectID, imageID }) {
  return { type: types.DELETE_IMAGE, projectID, imageID };
}

export function deleteImageSuccess(images) {
  return { type: types.DELETE_IMAGE_SUCCESS, images };
}

export function switchImage(image) {
  return { type: types.SWITCH_IMAGE, image };
}
