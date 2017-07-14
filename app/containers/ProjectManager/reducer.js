import { fromJS } from 'immutable';
import * as iTypes from 'containers/ImageManager/constants';
import * as cTypes from 'containers/Comments/constants';
import * as types from './constants';

const initialState = fromJS({
  attributes: null,
  user_role: null,
  collaborators: [],
  currentImage: 0,
  material_cost: 0,
  comments: [],
  currentComment: null,
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

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state.set('material_cost', fromJS(action.response));

    case types.UPDATE_PROJECT_SUCCESS:
      return state;

    // Images

    case iTypes.CREATE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Project') {
        return setProjectImages(state, action).set(
          'currentImage',
          imageCount(state)
        );
      }
      return state;

    case iTypes.DELETE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Project') {
        return setProjectImages(state, action).set(
          'currentImage',
          imageCount(state) - 2
        );
      }
      return state;

    case iTypes.UPDATE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Project') {
        return state.setIn(
          ['attributes', 'images'],
          fromJS(action.response.images)
        );
      }
      return state;

    case iTypes.SWITCH_IMAGE:
      return state.set('currentImage', action.index);

    // Comments

    case cTypes.CREATE_COMMENT_SUCCESS:
      return state
        .set('comments', fromJS(action.response))
        .set('currentComment', commentCount(state));

    case cTypes.UPDATE_COMMENT_SUCCESS:
      return state;

    case cTypes.DELETE_COMMENT_SUCCESS:
      return state
        .set('comments', fromJS(action.response))
        .set('currentComment', null);

    default:
      return state;
  }
}

export default projectReducer;
