
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  project: null,
  images: [],
  currentImage: 0,
  components: [],
  currentComponent: null,
  measurements: [],
});

function projectReducer(state = initialState, action) {

  const imageCount = state.get('images').size;
  const componentCount = state.get('components').size;
  const currentComponent = state.get('currentComponent');

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
      return state
        .setIn(['components', currentComponent], fromJS(action.component))
        .set('currentComponent', null);

    case types.CREATE_COMPONENT:
      return state
        .set('currentComponent', null);

    case types.CREATE_COMPONENT_SUCCESS:
      return state.set(
        'components',
        state.get('components').insert(0, fromJS(action.component))
      ).set('currentComponent', 0); // TL;DR: insert at beginning of list

    case types.DELETE_COMPONENT_SUCCESS:
      return state
        .set('components', fromJS(action.components))
        .set('currentComponent', null);

    case types.SWITCH_COMPONENT:
      return state
        .set('currentComponent', action.index);

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state
        .setIn(['project', 'material_cost'], action.cost);

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

    // Measurements

    case types.FETCH_MEASUREMENTS_SUCCESS:
      return state
        .set('measurements', fromJS(action.measurements));

    case types.UPDATE_MEASUREMENTS:
      return state
        .set('measurements', fromJS([]));
      
    case types.UPDATE_MEASUREMENTS_SUCCESS:
      const { measurements } = action.response;
      return state
        .set('measurements', fromJS(measurements));

    case types.CREATE_MEASUREMENT_GROUP:
      return state
        .set('measurements', fromJS([]));

    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
      return state
        .set('measurements', fromJS(action.measurements));

    case types.CREATE_MEASUREMENT_NAME:
      return state
        .set('measurements', fromJS([]));

    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
      return state
        .set('measurements', fromJS(action.measurements));
      
    default:
      return state;
  }
}

export default projectReducer;
