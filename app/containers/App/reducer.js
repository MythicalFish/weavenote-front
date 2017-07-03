/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as materialActionTypes from 'containers/MaterialList/constants';
import * as orgActionTypes from 'containers/Organization/constants';
import * as profileActionTypes from 'containers/Profile/constants';
import * as appActionTypes from './constants/actions';
import * as sections from './constants/sections';

const initialState = fromJS({
  user: null,
  organization: null,
  organization_role: null,
  organizations: null,
  abilities: null,
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

    case appActionTypes.FETCH_USER_SUCCESS:
      return state
        .set('user', fromJS(action.data.user))
        .set('organization', action.data.organization)
        .set('organization_role', action.data.organization_role)
        .set('organizations', fromJS(action.data.organizations))
        .set('abilities', action.data.abilities);

    case profileActionTypes.UPDATE_PROFILE_SUCCESS:
      return state
        .setIn(['user', 'name'], action.data.name);

    case appActionTypes.FETCH_INVITE_SUCCESS:
      return state
        .set('invite', action.invite);

    // Org

    case orgActionTypes.CREATE_ORGANIZATION_SUCCESS:
      return state
        .set('organization', action.data.organization)
        .set('organization_role', action.data.organization_role)
        .set('organizations', fromJS(action.data.organizations))
        .set('abilities', action.data.abilities);

    case orgActionTypes.UPDATE_ORGANIZATION_SUCCESS:
      return state
        .set('organization', action.data);

    //

    case appActionTypes.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    case appActionTypes.FETCH_STATS_SUCCESS:
      return state
        .set('stats', fromJS(action.stats));

    // Materials

    case materialActionTypes.FETCH_MATERIALS_SUCCESS:
      return state
        .set('materials', fromJS(action.materials));

    default:
      return state;
  }
}

export default appReducer;
