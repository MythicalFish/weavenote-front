
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  project: null,
  images: [],
  currentImage: null,
  components: [],
  currentComponent: null,
});

function projectReducer(state = initialState, action) {

  switch (action.type) {

    // Project

    case types.FETCH_PROJECT:
      return state
        .set('project', null);

    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('project', fromJS(action.data));

    case types.UPDATE_PROJECT_SUCCESS:
      return state;

    // Components

    case types.FETCH_COMPONENTS_SUCCESS:
      return state
        .set('components', fromJS(action.components));
    
    case types.UPDATE_COMPONENT_SUCCESS:
      return state;

    case types.CREATE_COMPONENT_SUCCESS:
      return state
        .setIn(['components', -1], fromJS(action.component))
        .set('currentComponent', action.component);

    case types.DELETE_COMPONENT_SUCCESS:
      return state
        .set('components', fromJS(action.components))
        .set('currentComponent', action.components[0]);
      
    case types.SWITCH_COMPONENT:
      return state
        .set('currentComponent', action.component);
      
    // Images

    case types.FETCH_IMAGES_SUCCESS:
      return state
        .set('images', fromJS(action.images))
        .set('currentImage', action.images[0]);
    
    case types.UPDATE_IMAGE_SUCCESS:
      return state;

    case types.CREATE_IMAGE_SUCCESS:
      return state
        .setIn(['images', -1], fromJS(action.image))
        .set('currentImage', action.image);

    case types.DELETE_IMAGE_SUCCESS:
      return state
        .set('images', fromJS(action.images))
        .set('currentImage', action.images[0]);
      
    case types.SWITCH_IMAGE:
      return state
        .set('currentImage', action.image);
      
    default:
      return state;
  }
}

export default projectReducer;
