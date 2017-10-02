import { fromJS } from 'immutable';
import { FETCH_COMMENTS_SUCCESS } from './constants';
import { FETCH_PROJECT_SUCCESS } from '../ProjectManager/constants';
import { CREATE_IMAGE_SUCCESS } from '../ImageUploader/constants';
import {
  DELETE_IMAGE_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
} from 'containers/ImageForm/constants';
import * as types from 'containers/Comments/constants';
import { setImages } from './reducerHelpers';
const initialState = fromJS({
  comments: [],
});

const setComments = (state, action) =>
  state.set('comments', fromJS(action.response));

export default function ProjectCommentsReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    // Init
    case FETCH_PROJECT_SUCCESS:
      return state.set('comments', fromJS(response.comments));

    case FETCH_COMMENTS_SUCCESS:
      return state.set('comments', fromJS(response));

    // Images

    case CREATE_IMAGE_SUCCESS:
      return setImages(state, action);

    case DELETE_IMAGE_SUCCESS:
      return setImages(state, action);

    case UPDATE_IMAGE_SUCCESS:
      return setImages(state, action);

    // Comments

    case types.CREATE_COMMENT_SUCCESS:
      return setComments(state, action);

    case types.UPDATE_COMMENT_SUCCESS:
      return setComments(state, action);

    case types.DELETE_COMMENT_SUCCESS:
      return setComments(state, action);

    default:
      return state;
  }
}
