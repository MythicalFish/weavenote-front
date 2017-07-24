import * as types from './constants';

export function deleteImage(payload) {
  return { type: types.DELETE_IMAGE, payload };
}

export function deleteImageSuccess(response) {
  return { type: types.DELETE_IMAGE_SUCCESS, response };
}
