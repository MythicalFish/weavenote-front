import * as types from './constants';

export function updateProfile(user) {
  return { type: types.UPDATE_PROFILE, user };
}

export function updateProfileSuccess(data) {
  return { type: types.UPDATE_PROFILE_SUCCESS, data };
}

export function requestPassword() {
  return { type: types.REQUEST_PASSWORD };
}

export function requestPasswordSuccess() {
  return { type: types.REQUEST_PASSWORD_SUCCESS };
}
