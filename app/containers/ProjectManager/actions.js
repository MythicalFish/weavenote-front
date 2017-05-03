import * as types from './constants/actions';

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
