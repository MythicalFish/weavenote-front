import * as types from './constants/actions';

// Invite

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
