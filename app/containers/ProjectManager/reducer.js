import { fromJS } from 'immutable';
import * as iTypes from 'containers/ImageManager/constants';
import * as cTypes from 'containers/Comments/constants';
import * as types from './constants';
import { setImages } from './reducerHelpers';

const initialState = fromJS({
  project: {
    comments: [],
    collaborators: [],
    material_cost: null,
  },
  userRole: null,
  currentImage: 0,
});

const imageCount = (state) => state.getIn(['project', 'images']).size;

const setComments = (state, action) => state.setIn(['project', 'comments'], fromJS(action.response));

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
      return setImages(state, action, imageCount(state));

    case iTypes.DELETE_IMAGE_SUCCESS:
      return setImages(state, action, imageCount(state) - 2);

    case iTypes.UPDATE_IMAGE_SUCCESS:
      return setImages(state, action);

    case iTypes.SWITCH_IMAGE:
      return state.set('currentImage', action.payload.index);

    // Comments

    case cTypes.CREATE_COMMENT_SUCCESS:
      return setComments(state, action);

    case cTypes.UPDATE_COMMENT_SUCCESS:
      return setComments(state, action);

    case cTypes.DELETE_COMMENT_SUCCESS:
      return setComments(state, action);

    default:
      return state;
  }
}

export default projectReducer;
