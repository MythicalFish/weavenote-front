/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  stats: {
    projects: {
      counts: [],
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_STATS_SUCCESS:
      return state
        .set('stats', action.stats);
    default:
      return state;
  }
}

export default appReducer;
