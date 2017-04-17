/*
 *
 * Projects reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PROJECTS,
  LOAD_PROJECTS_SUCCESS,
} from './constants';

const initialState = fromJS({});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS:
      return state;
    case LOAD_PROJECTS_SUCCESS:
      return state
        .set('projects', state.projects);
    default:
      return state;
  }
}

export default projectsReducer;
