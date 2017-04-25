
import { fromJS } from 'immutable';
import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = fromJS({
  list: false,
  active: {
    id: false,
    basics: false,
  },
  currentView: 'list',
});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list)
        .set('currentView', 'list');
    case types.SHOW_PROJECT:
      return state
        .setIn(['active', 'id'], action.id);
    case types.SHOW_PROJECT_SUCCESS:
      return state
        .setIn(['active', 'basics'], action.data)
        .set('currentView', 'show');
    case LOCATION_CHANGE:
      return state
        .set('currentView', 'list');
    default:
      return state;
  }
}

export default projectsReducer;
