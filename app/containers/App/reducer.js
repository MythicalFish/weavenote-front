/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';
import * as sections from './constants/sections';

const initialState = fromJS({
  stats: {
    projects: {
      counts: [],
    },
  },
  currentSection: sections.Default,
});

function appReducer(state = initialState, action) {
  switch (action.type) {

    case types.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    case types.GET_STATS_SUCCESS:
      return state
        .set('stats', action.stats);
    default:
      return state;
  }
}

export default appReducer;
