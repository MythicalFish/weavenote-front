/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as orgActionTypes from 'containers/Organization/constants';
import * as profileActionTypes from 'containers/Profile/constants';
import * as appActionTypes from './constants/actions';
import * as sections from './constants/sections';

const initialState = fromJS({
  user: {
    organization: null,
    role: null,
    organizations: null,
    abilities: null,
  },
  globalData: null,
  invite: null,
  currentSection: sections.Default,
  modalID: null,
  modalImage: null,
  focus: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // Global data

    case appActionTypes.FETCH_GLOBAL_DATA:
      return state.set('globalData', { fetching: true });

    case appActionTypes.FETCH_GLOBAL_DATA_SUCCESS:
      return state.set('globalData', fromJS(action.response).toObject());

    // User

    case appActionTypes.FETCH_USER_SUCCESS:
      return state.set('user', fromJS(action.data));

    case profileActionTypes.UPDATE_PROFILE_SUCCESS:
      return state.setIn(['user', 'name'], action.data.name);

    case appActionTypes.FETCH_INVITE_SUCCESS:
      return state.set('invite', action.invite);

    // Org

    case orgActionTypes.SWITCH_ORGANIZATION_SUCCESS:
      return state.set('user', fromJS(action.data));

    case orgActionTypes.CREATE_ORGANIZATION_SUCCESS:
      return state.set('user', fromJS(action.data));

    case orgActionTypes.UPDATE_ORGANIZATION_SUCCESS:
      return state.setIn(['user', 'organization'], fromJS(action.data));

    //

    case appActionTypes.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    // Misc

    case appActionTypes.OPEN_MODAL:
      return state.set('modalID', action.id);

    case appActionTypes.CLOSE_MODAL:
      return state.set('modalID', null);

    case appActionTypes.OPEN_IMAGE:
      return state.set('modalID', 'image').set('modalImage', action.image);

    case appActionTypes.BRING_FOCUS:
      return state.set('focus', action.id);

    case appActionTypes.HIDE_FOCUS:
      return state.set('focus', null);

    default:
      return state;
  }
}

export default appReducer;
