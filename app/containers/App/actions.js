import * as types from './constants';

export function getStats() {
  return {
    type: types.GET_STATS,
  };
}

export function getStatsSuccess(stats) {
  return {
    type: types.GET_STATS_SUCCESS,
    stats,
  };
}
