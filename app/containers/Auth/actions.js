/*
 *
 * Auth actions
 *
 */

import * as types from './constants';

export function fetchUser() {
  return {
    type: types.FETCH_USER,
  };
}

export function fetchUserSuccess(data) {
  return {
    type: types.FETCH_USER_SUCCESS,
    data,
  };
}
