import * as types from './constants';

export function fetchComments(payload) {
  return { type: types.FETCH_COMMENTS, payload };
}
export function fetchCommentsSuccess(response) {
  return { type: types.FETCH_COMMENTS_SUCCESS, response };
}

export function focusComment(payload) {
  return { type: types.FOCUS_COMMENT, payload };
}

export function cancelCommentAction() {
  return { type: types.CANCEL_COMMENT_ACTION };
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

export function writeComment(payload) {
  return { type: types.WRITE_COMMENT, payload };
}
export function editComment(payload) {
  return { type: types.EDIT_COMMENT, payload };
}
export function writeReply(payload) {
  return { type: types.WRITE_REPLY, payload };
}
