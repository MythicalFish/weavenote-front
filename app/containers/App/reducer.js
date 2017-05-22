/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as MaterialListActionTypes from 'containers/MaterialList/constants';
import * as AppActionTypes from './constants';
import * as sections from './constants/sections';

const types = {
  App: AppActionTypes,
  MaterialList: MaterialListActionTypes,
};


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
  materials: [],
});

function appReducer(state = initialState, action) {

  switch (action.type) {

    case types.App.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    case types.App.FETCH_STATS_SUCCESS:
      return state
        .set('stats', fromJS(action.stats));

    // Materials

    case types.MaterialList.FETCH_MATERIALS_SUCCESS:
      return state
        .set('materials', fromJS(action.materials));

    default:
      return state;
  }
}

export default appReducer;
