import * as types from './constants';

export function updateImage(payload) {
  return { type: types.UPDATE_IMAGE, payload };
}

export function updateImageSuccess(response) {
  return { type: types.UPDATE_IMAGE_SUCCESS, response };
}

export function deleteImage(payload) {
  return { type: types.DELETE_IMAGE, payload };
}

export function deleteImageSuccess(response) {
  return { type: types.DELETE_IMAGE_SUCCESS, response };
}
