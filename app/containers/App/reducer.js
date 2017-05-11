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
      counts: {
        by_stage: [],
        active: [],
      },
    },
  },
  currentSection: sections.Default,
  materials: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {

    case types.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    case types.GET_STATS_SUCCESS:
      return state
        .set('stats', fromJS(action.stats));

    // Materials

    case 'FETCH_MATERIALS_SUCCESS':
      return state
        .set('materials', fromJS(action.list));

    default:
      return state;
  }
}

export default appReducer;
