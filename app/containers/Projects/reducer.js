
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  list: false,
  current: {
    basics: false,
  },
});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list);
    case types.SHOW_BASICS:
      return state
        .setIn(['current', 'id'], action.id);
    case types.SHOW_BASICS_SUCCESS:
      return state
        .setIn(['current', 'basics'], action.data);
    default:
      return state;
  }
}

export default projectsReducer;
