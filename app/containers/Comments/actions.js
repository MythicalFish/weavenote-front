import * as types from './constants';

export function switchComment(payload) {
  return { type: types.SWITCH_COMMENT, payload };
}

export function createComment(payload) {
  return { type: types.CREATE_COMMENT, payload };
}

export function createCommentSuccess(response) {
  return { type: types.CREATE_COMMENT_SUCCESS, response };
}

export function updateComment(payload) {
  return { type: types.UPDATE_COMMENT, payload: payload.toObject() };
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

export function startCreateComment(payload) {
  return { type: types.START_CREATE_COMMENT, payload };
}
export function startUpdateComment(payload) {
  return { type: types.START_UPDATE_COMMENT, payload };
}
export function startReplyComment(payload) {
  return { type: types.START_REPLY_COMMENT, payload };
}
