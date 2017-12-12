import * as types from './constants';

export function fetchAnnotations(archived) {
  return { type: types.FETCH_ANNOTATIONS, archived: !!archived };
}
export function fetchAnnotationsSuccess(response) {
  return { type: types.FETCH_ANNOTATIONS_SUCCESS, response };
}

export function focusAnnotation(payload) {
  return { type: types.FOCUS_ANNOTATION, payload };
}

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

export function updateAnnotation(payload) {
  return { type: types.UPDATE_ANNOTATION, payload };
}

export function updateAnnotationSuccess(response) {
  return { type: types.UPDATE_ANNOTATION_SUCCESS, response };
}

export function deleteAnnotation(payload) {
  return { type: types.DELETE_ANNOTATION, payload };
}

export function deleteAnnotationSuccess(response) {
  return { type: types.DELETE_ANNOTATION_SUCCESS, response };
}

export function buildAnnotation(payload) {
  return { type: types.BUILD_ANNOTATION, payload };
}

export function setAnchor(payload) {
  return { type: types.SET_ANCHOR, payload };
}

export function editLabel(payload) {
  return { type: types.EDIT_LABEL, payload };
}
