import * as types from './constants';

export function startAnnotation(payload) {
  return { type: types.START_ANNOTATION, payload };
}

export function createAnnotation(payload) {
  return { type: types.CREATE_ANNOTATION, payload };
}

export function createAnnotationSuccess(response) {
  return { type: types.CREATE_ANNOTATION_SUCCESS, response };
}

export function setAnnotation(payload) {
  return { type: types.SET_ANNOTATION, payload };
}
