import * as types from './constants';

export function updateProfile(user) {
  return { type: types.UPDATE_PROFILE, user };
}

export function updateProfileSuccess(data) {
  return { type: types.UPDATE_PROFILE_SUCCESS, data };
}
