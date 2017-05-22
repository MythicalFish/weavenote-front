import * as types from './constants';

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
