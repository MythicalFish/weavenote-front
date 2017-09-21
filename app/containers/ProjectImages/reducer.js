import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import {
  DELETE_IMAGE_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
} from 'containers/ImageForm/constants';
import { FETCH_PROJECT_SUCCESS } from 'containers/ProjectManager/constants';
import { CREATE_ANNOTATION_SUCCESS } from 'containers/ImageAnnotations/constants';

const initialState = fromJS([]);

function ProjectImagesReducer(state = initialState, action) {
  const { response } = action;

  const setImages = () => {
    const { type } = response.imageable;
    if (type && type !== 'Project') return state;
    return fromJS(response.images);
  };

  const imageIndex = () => idToIndex(response.id, state);

  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return fromJS(response.images);

    case CREATE_IMAGE_SUCCESS:
      return setImages();

    case DELETE_IMAGE_SUCCESS:
      return setImages();

    case UPDATE_IMAGE_SUCCESS:
      return setImages();

    case CREATE_ANNOTATION_SUCCESS:
      return state.set(imageIndex(), fromJS(response));

    default:
      return state;
  }
}

export default ProjectImagesReducer;
