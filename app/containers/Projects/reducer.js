
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  list: false,
  active: {
    id: false,
    basics: false,
  },
});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list)
        .setIn(['active', 'id'], false);
    case types.SHOW_BASICS:
      return state
        .setIn(['active', 'id'], action.id);
    case types.SHOW_BASICS_SUCCESS:
      return state
        .setIn(['active', 'basics'], action.data);
    case '@@router/LOCATION_CHANGE':
      return state
        .setIn(['active', 'id'], false);  
    default:
      return state;
  }
}

export default projectsReducer;
