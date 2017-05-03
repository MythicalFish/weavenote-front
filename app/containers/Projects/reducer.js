
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants/actions';
import * as views from './constants/views';
import * as sections from './constants/sections';

const initialState = fromJS({
  list: false,
  currentProject: null,
  currentImage: null,
  currentView: views.Default,
  currentSection: sections.Default,
});

function projectsReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list)
        .set('currentView', views.List);

    case types.CREATE_PROJECT_SUCCESS:
      return state
        .set('list', action.list)
        .set('currentView', views.List);
      
    case types.ARCHIVE_PROJECT_SUCCESS:
      return state
        .set('list', action.list)
        .set('currentView', views.List);

    case types.SHOW_PROJECT_SUCCESS:
      return state
        .set('currentImage', null)
        .set('currentProject', fromJS(action.data))
        .set('currentView', views.Show)
        .setIn(['currentSection', 'id'], sections.Basics.id)
        .setIn(['currentSection', 'label'], sections.Basics.label);
      
    case types.UPDATE_BASICS_SUCCESS:
      console.log('UPDATE_BASICS_SUCCESS');
      return state;

    case types.CREATE_IMAGE_SUCCESS:
      const image = fromJS(payload.image);
      return state
        .setIn(['currentProject', 'images', -1], image)
        .set('currentImage', image);
    
    case types.SELECT_IMAGE:
      return state
        .set('currentImage', fromJS(payload));
      
    case types.CHANGE_SECTION:
      return state
        .setIn(['currentSection', 'id'], action.section.id)
        .setIn(['currentSection', 'label'], action.section.label);

    case LOCATION_CHANGE:
      return state
        .set('currentView', views.Default)
        .setIn(['currentSection', 'id'], sections.Default.id)
        .setIn(['currentSection', 'label'], sections.Default.label);
    default:
      return state;
  }
}

export default projectsReducer;
