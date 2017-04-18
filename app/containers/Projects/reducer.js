/*
 *
 * Projects reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  projects: [],
});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_PROJECTS:
      return state;
    case types.LOAD_PROJECTS_SUCCESS:
      return state
        .set('projects', state.projects);
    default:
      return state;
  }
}

export default projectsReducer;
