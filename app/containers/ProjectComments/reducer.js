import { fromJS } from 'immutable';
import { FETCH_COMMENTS_SUCCESS } from './constants';
import { FETCH_PROJECT_SUCCESS } from '../ProjectManager/constants';
import { CREATE_IMAGE_SUCCESS } from '../ImageUploader/constants';
import {
  DELETE_IMAGE_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
} from '../ImageForm/constants';
import * as types from '../Comments/constants';
import { setImages } from './reducerHelpers';

const initialState = fromJS([]);

export default function ProjectCommentsReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    // Init
    case FETCH_PROJECT_SUCCESS:
      return fromJS(response.comments);

    case FETCH_COMMENTS_SUCCESS:
      return fromJS(response);

    // Images

    case CREATE_IMAGE_SUCCESS:
      return setImages(state, action);

    case DELETE_IMAGE_SUCCESS:
      return setImages(state, action);

    case UPDATE_IMAGE_SUCCESS:
      return setImages(state, action);

    // Comments

    case types.CREATE_COMMENT_SUCCESS:
      return fromJS(action.response);

    case types.UPDATE_COMMENT_SUCCESS:
      return fromJS(action.response);

    case types.DELETE_COMMENT_SUCCESS:
      return fromJS(action.response);

    default:
      return state;
  }
}
