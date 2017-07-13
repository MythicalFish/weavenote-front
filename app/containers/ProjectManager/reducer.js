import { fromJS } from 'immutable';
import * as imageActionTypes from 'containers/ImageManager/constants';
import * as types from './constants';

const initialState = fromJS({
  attributes: null,
  user_role: null,
  collaborators: [],
  currentImage: 0,
  measurements: [],
  material_cost: 0,
});

const setProjectImages = (state, action) =>
  state.setIn(['attributes', 'images'], fromJS(action.response.images));

const imageCount = (state) => state.getIn(['attributes', 'images']).size;

function projectReducer(state = initialState, action) {
  switch (action.type) {
    // Project

    case types.FETCH_PROJECT:
      return initialState;

    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('attributes', fromJS(action.data.attributes))
        .set('user_role', fromJS(action.data.user_role))
        .set('material_cost', fromJS(action.data.material_cost))
        .set('collaborators', fromJS(action.data.collaborators));

    case types.UPDATE_PROJECT_SUCCESS:
      return state;

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
