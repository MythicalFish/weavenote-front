/*
 *
 * Auth actions
 *
 */

import * as types from './constants';

export function showLock() {
  return {
    type: types.SHOW_LOCK,
  };
}

export function lockSuccess(profile, token) {
  return {
    type: types.LOCK_SUCCESS,
    profile,
    token,
  };
}

export function lockError(err) {
  return {
    type: types.LOCK_ERROR,
    err,
  };
}
