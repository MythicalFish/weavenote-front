/*
 *
 * Projects reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PROJECTS,
} from './constants';

const initialState = fromJS({});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS:
      return state;
    default:
      return state;
  }
}

export default projectsReducer;
