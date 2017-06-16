import * as types from './constants/actions';

// Users

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

export function acceptInvite(key) {
  return {
    type: types.ACCEPT_INVITE,
    key,
  };
}

export function acceptInviteSuccess(data) {
  return {
    type: types.ACCEPT_INVITE_SUCCESS,
    data,
  };
}

// Stats

export function fetchStats() {
  return {
    type: types.FETCH_STATS,
  };
}

export function fetchStatsSuccess(stats) {
  return {
    type: types.FETCH_STATS_SUCCESS,
    stats,
  };
}

/*
 *
 *  Sections
 *
 */


export function changeSection(section) {
  return {
    type: types.CHANGE_SECTION,
    section,
  };
}
