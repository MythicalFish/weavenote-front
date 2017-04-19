/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  projects: false,
  logged_in: false,
  user_data: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_PROJECTS:
      return state
        .set('loading', true)
        .set('error', false);
    case types.LOAD_PROJECTS_SUCCESS:
      return state
        .set('projects', action.projects)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
