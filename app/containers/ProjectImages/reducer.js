import { fromJS } from 'immutable';
import * as types from './constants';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import {
  DELETE_IMAGE_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
} from 'containers/ImageForm/constants';
import { FETCH_PROJECT_SUCCESS } from 'containers/ProjectManager/constants';

const initialState = fromJS({
  currentImage: 0,
  imageList: [],
});

function ProjectImagesReducer(state = initialState, action) {
  const { response, payload } = action;

  const imageableType = () => response.imageable.type;

  switch (action.type) {
    case types.FOCUS_IMAGE:
      return state.set('currentImage', payload);
    case FETCH_PROJECT_SUCCESS:
      return state.set('imageList', fromJS(response.images));

    case CREATE_IMAGE_SUCCESS:
    case DELETE_IMAGE_SUCCESS:
    case UPDATE_IMAGE_SUCCESS:
      if (imageableType() === 'Project') {
        return state.set('imageList', fromJS(response.images));
      }
      break;

    default:
      return state;
  }
}

export default ProjectImagesReducer;
