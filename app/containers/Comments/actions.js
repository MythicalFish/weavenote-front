import * as types from './constants';

export function switchComment(index) {
  return { type: types.SWITCH_COMMENT, index };
}

export function createComment(payload) {
  return { type: types.CREATE_COMMENT, payload };
}

export function createCommentSuccess(response) {
  return { type: types.CREATE_COMMENT_SUCCESS, response };
}

export function updateComment(payload) {
  return { type: types.UPDATE_COMMENT, payload };
}

export function updateCommentSuccess(response) {
  return { type: types.UPDATE_COMMENT_SUCCESS, response };
}

export function deleteComment(payload) {
  return { type: types.DELETE_COMMENT, payload };
}

export function deleteCommentSuccess(response) {
  return { type: types.DELETE_COMMENT_SUCCESS, response };
}
