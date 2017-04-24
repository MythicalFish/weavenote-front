
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  items: false,
});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return state
        .set('items', action.projects);
    default:
      return state;
  }
}

export default projectsReducer;
