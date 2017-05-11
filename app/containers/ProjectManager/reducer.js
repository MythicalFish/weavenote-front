
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  project: null,
  images: [],
  currentImage: 0,
  components: [],
  currentComponent: null,
});

function projectReducer(state = initialState, action) {

  const imageCount = state.get('images').size;

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

    case types.CREATE_COMPONENT:
      return state
        .set('currentComponent', null);

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
        .set('currentComponent', action.index);

    // Images

    case types.FETCH_IMAGES_SUCCESS:
      return state
        .set('images', fromJS(action.images));

    case types.UPDATE_IMAGE_SUCCESS:
      return state;

    case types.CREATE_IMAGE_SUCCESS:
      return state
        .setIn(['images', imageCount], fromJS(action.image))
        .set('currentImage', imageCount);

    case types.DELETE_IMAGE_SUCCESS:
      return state
        .set('images', fromJS(action.images))
        .set('currentImage', 0);

    case types.SWITCH_IMAGE:
      return state
        .set('currentImage', action.index);

    default:
      return state;
  }
}

export default projectReducer;
