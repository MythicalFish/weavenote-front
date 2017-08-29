import * as types from './constants';

export function fetchUser() {
  return { type: types.FETCH_USER };
}

export function fetchUserSuccess(data) {
  return { type: types.FETCH_USER_SUCCESS, data };
}

export function updateUser(user) {
  return { type: types.UPDATE_USER, user };
}

export function updateUserSuccess(data) {
  return { type: types.UPDATE_USER_SUCCESS, data };
}

export function requestPassword() {
  return { type: types.REQUEST_PASSWORD };
}

export function requestPasswordSuccess() {
  return { type: types.REQUEST_PASSWORD_SUCCESS };
}
