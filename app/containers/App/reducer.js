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
  organization: null,
  organization_role: null,
  organizations: null,
  invite: null,
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

    // User

    case types.App.FETCH_USER_SUCCESS:
      return state
        .set('user', action.data.user)
        .set('organization', action.data.organization)
        .set('organization_role', action.data.organization_role)
        .set('organizations', fromJS(action.data.organizations));

    case types.App.FETCH_INVITE_SUCCESS:
      return state
        .set('invite', action.invite);

    // Org

    case types.Org.CREATE_ORG_SUCCESS:
      return state
        .set('organizations', fromJS(action.data.organizations))
        .set('organization', fromJS(action.data.organization));


    //

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
