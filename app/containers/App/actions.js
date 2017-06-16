import * as types from './constants/actions';


// Users

export function fetchUser() {
  return { type: types.FETCH_USER };
}

export function fetchUserSuccess(data) {
  return { type: types.FETCH_USER_SUCCESS, data };
}


// Invite

export function handleInvite(key) {
  return { type: types.HANDLE_INVITE, key };
}

export function retrieveInvite(key) {
  return { type: types.RETRIEVE_INVITE, key };
}

export function retrieveInviteSuccess(invite) {
  return { type: types.RETRIEVE_INVITE_SUCCESS, invite };
}

export function acceptInvite(key) {
  return { type: types.ACCEPT_INVITE, key };
}

export function acceptInviteSuccess(userData) {
  return { type: types.ACCEPT_INVITE_SUCCESS, userData };
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
