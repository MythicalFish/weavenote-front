
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants/actions';
import * as sections from './constants/sections';

const initialState = fromJS({
  list: false,
  currentProject: null,
  currentImage: null,
  currentSection: sections.Default,
});

function projectsReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list);

    case types.CREATE_PROJECT_SUCCESS:
      return state
        .set('list', action.list);

    case types.ARCHIVE_PROJECT_SUCCESS:
      return state
        .set('list', action.list);

    case types.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    case LOCATION_CHANGE:
      return state
        .setIn(['currentSection', 'id'], sections.Default.id)
        .setIn(['currentSection', 'label'], sections.Default.label);
    default:
      return state;
  }
}

export default projectsReducer;
