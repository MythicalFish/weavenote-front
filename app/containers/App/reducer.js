/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as MaterialListActionTypes from 'containers/MaterialList/constants';
import * as OrgActionTypes from 'containers/Organization/constants';
import * as AppActionTypes from './constants/actions';
import * as sections from './constants/sections';

const types = {
  App: AppActionTypes,
  MaterialList: MaterialListActionTypes,
  Org: OrgActionTypes,
};


const initialState = fromJS({
  user: null,
  user_role: null,
  current_organization: null,
  organizations: null,
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

    // User

    case types.App.FETCH_USER_SUCCESS:
      return state
        .set('user', action.data.user)
        .set('user_role', action.data.role)
        .set('organizations', fromJS(action.data.organizations))
        .set('current_organization', action.data.current_organization);

    // Org

    case types.Org.CREATE_ORG_SUCCESS:
      return state
        .set('organizations', fromJS(action.data.organizations))
        .set('current_organization', fromJS(action.data.current_organization));

    // Stats

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
