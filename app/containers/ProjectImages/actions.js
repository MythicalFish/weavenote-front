import * as types from './constants';

export function addAnnotation(payload) {
  return { type: types.ADD_ANNOTATION, payload };
}

export function cancelAnnotation() {
  return { type: types.CANCEL_ANNOTATION };
}

export function createAnnotation(payload) {
  return { type: types.CREATE_ANNOTATION, payload };
}

export function createAnnotationSuccess(response) {
  return { type: types.CREATE_ANNOTATION_SUCCESS, response };
}

export function setAnnotation(payload) {
  return {
    type: types.SET_ANNOTATION,
    payload,
  };
}
