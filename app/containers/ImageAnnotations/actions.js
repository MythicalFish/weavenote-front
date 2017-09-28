import * as types from './constants';

export function startAnnotation(payload) {
  return { type: types.START_ANNOTATION, payload };
}

export function cancelAnnotation() {
  return { type: types.CANCEL_ANNOTATION };
}

export function createAnnotation() {
  return { type: types.CREATE_ANNOTATION };
}

export function createAnnotationSuccess(response) {
  return { type: types.CREATE_ANNOTATION_SUCCESS, response };
}

export function setAnnotation(payload) {
  return { type: types.SET_ANNOTATION, payload };
}

export function setAnchor(payload) {
  return { type: types.SET_ANCHOR, payload };
}
