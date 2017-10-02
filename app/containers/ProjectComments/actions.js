import * as types from './constants';

export function fetchComments(payload) {
  return { type: types.FETCH_COMMENTS, payload };
}
export function fetchCommentsSuccess(response) {
  return { type: types.FETCH_COMMENTS_SUCCESS, response };
}
