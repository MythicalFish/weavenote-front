import * as types from './constants';

export function uploadImage(payload) {
  return { type: types.UPLOAD_IMAGE, payload };
}

export function createImage(payload) {
  return { type: types.CREATE_IMAGE, payload };
}

export function createImageSuccess(response) {
  return { type: types.CREATE_IMAGE_SUCCESS, response };
}
