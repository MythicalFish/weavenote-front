import * as types from './constants';

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
