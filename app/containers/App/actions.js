import * as types from './constants/actions';

// Invite

export function setInviteKey(key) {
  return { type: types.SET_INVITE_KEY, key };
}

export function fetchInvite(key) {
  return { type: types.FETCH_INVITE, key };
}

export function fetchInviteSuccess(invite) {
  return { type: types.FETCH_INVITE_SUCCESS, invite };
}

export function handleInvite(key) {
  return { type: types.HANDLE_INVITE, key };
}

export function handleInviteSuccess() {
  return { type: types.HANDLE_INVITE_SUCCESS };
}

// Users

export function fetchUser() {
  return { type: types.FETCH_USER };
}

export function fetchUserSuccess(data) {
  return { type: types.FETCH_USER_SUCCESS, data };
}

// Stats

export function fetchStats() {
  return { type: types.FETCH_STATS };
}

export function fetchStatsSuccess(stats) {
  return { type: types.FETCH_STATS_SUCCESS, stats };
}

// Other

export function changeSection(section) {
  return { type: types.CHANGE_SECTION, section };
}

export function openModal(id) {
  return { type: types.OPEN_MODAL, id };
}

export function closeModal() {
  return { type: types.CLOSE_MODAL };
}

export function openImage(image) {
  return { type: types.OPEN_IMAGE, image };
}
