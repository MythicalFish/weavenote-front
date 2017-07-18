import { fromJS } from 'immutable';
import * as iTypes from 'containers/ImageManager/constants';
import * as cTypes from 'containers/Comments/constants';
import * as types from './constants';

const initialState = fromJS({
  project: {
    comments: [],
    collaborators: [],
    material_cost: null,
  },
  userRole: null,
  currentImage: 0,
  currentComment: null,
});

const setProjectImages = (state, action) =>
  state.setIn(['project', 'images'], fromJS(action.response.images));

const imageCount = (state) => state.getIn(['project', 'images']).size;
const commentCount = (state) => state.getIn(['project', 'comments']).size;

function projectReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    // Project

    case types.FETCH_PROJECT:
      return initialState;

    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('project', fromJS(response.project))
        .set('userRole', fromJS(response.user_role));

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state.setIn(['project', 'material_cost'], fromJS(action.response));

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
          ['project', 'images'],
          fromJS(action.response.images)
        );
      }
      return state;

    case iTypes.SWITCH_IMAGE:
      return state.set('currentImage', action.index);

    // Comments

    case cTypes.CREATE_COMMENT_SUCCESS:
      return state
        .setIn(['project', 'comments'], fromJS(action.response))
        .set('currentComment', null);

    case cTypes.UPDATE_COMMENT_SUCCESS:
      return state;

    case cTypes.DELETE_COMMENT_SUCCESS:
      return state
        .setIn(['project', 'comments'], fromJS(action.response))
        .set('currentComment', null);

    case cTypes.SWITCH_COMMENT:
      return state.set('currentComment', action.index);

    default:
      return state;
  }
}

export default projectReducer;
