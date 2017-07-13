import { fromJS } from 'immutable';
import * as imageActionTypes from 'containers/ImageManager/constants';
import * as types from './constants';

const initialState = fromJS({
  attributes: null,
  user_role: null,
  collaborators: [],
  currentImage: 0,
  components: [],
  currentComponent: null,
  measurements: [],
});

const setProjectImages = (state, action) =>
  state.setIn(['attributes', 'images'], fromJS(action.response.images));

const imageCount = (state) => state.getIn(['attributes', 'images']).size;

function projectReducer(state = initialState, action) {
  const currentComponent = state.get('currentComponent');
  const currentInstruction = state.get('currentInstruction');

  switch (action.type) {
    // Project

    case types.FETCH_PROJECT:
      return initialState;

    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('attributes', fromJS(action.data.attributes))
        .set('user_role', fromJS(action.data.user_role))
        .set('material_cost', action.data.material_cost)
        .set('collaborators', fromJS(action.data.collaborators));

    case types.UPDATE_PROJECT_SUCCESS:
      return state;

    // Components

    case types.FETCH_COMPONENTS_SUCCESS:
      return state.set('components', fromJS(action.components));

    case types.UPDATE_COMPONENT_SUCCESS:
      return state
        .setIn(['components', currentComponent], fromJS(action.component))
        .set('currentComponent', null);

    case types.CREATE_COMPONENT:
      return state.set('currentComponent', null);

    case types.CREATE_COMPONENT_SUCCESS:
      return state
        .set(
          'components',
          state.get('components').insert(0, fromJS(action.component))
        )
        .set('currentComponent', 0); // TL;DR: insert at beginning of list

    case types.DELETE_COMPONENT_SUCCESS:
      return state
        .set('components', fromJS(action.components))
        .set('currentComponent', null);

    case types.SWITCH_COMPONENT:
      return state.set('currentComponent', action.index);

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state.set('material_cost', action.cost);

    // Images

    case imageActionTypes.CREATE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Project') {
        return setProjectImages(state, action).set(
          'currentImage',
          imageCount(state)
        );
      }
      return state;

    case imageActionTypes.DELETE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Project') {
        return setProjectImages(state, action).set(
          'currentImage',
          imageCount(state) - 2
        );
      }
      return state;

    case imageActionTypes.UPDATE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Project') {
        return state.setIn(
          ['attributes', 'images'],
          fromJS(action.response.images)
        );
      }
      return state;

    case imageActionTypes.SWITCH_IMAGE:
      return state.set('currentImage', action.index);

    // Measurements

    case types.FETCH_MEASUREMENTS_SUCCESS:
      return state.set('measurements', fromJS(action.measurements));

    case types.UPDATE_MEASUREMENTS_SUCCESS:
      const { measurements } = action.response;
      return state.set('measurements', fromJS(measurements));

    case types.CREATE_MEASUREMENT_GROUP:
      return state.set('measurements', fromJS([]));

    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
      return state.set('measurements', fromJS(action.measurements));

    case types.CREATE_MEASUREMENT_NAME:
      return state.set('measurements', fromJS([]));

    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
      return state.set('measurements', fromJS(action.measurements));

    default:
      return state;
  }
}

export default projectReducer;
