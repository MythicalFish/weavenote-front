/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from 'containers/Projects/constants';

const initialState = fromJS({
  loading: false,
  error: false,
  projects: false,
  logged_in: false,
  auth: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_PROJECTS:
      return state
        .set('loading', true)
        .set('error', false);
    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
