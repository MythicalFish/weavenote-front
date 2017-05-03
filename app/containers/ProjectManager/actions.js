import * as types from './constants/actions';

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
