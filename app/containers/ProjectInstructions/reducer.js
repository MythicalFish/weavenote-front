import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import * as types from './constants';
import { idToIndex } from 'utils/reducerHelpers';

const initialState = fromJS([]);

function ProjectInstructionsReducer(state = initialState, action) {
  const { response } = action;

  const isInstructionImage = () =>
    action.response.imageable.type === 'Instruction';

  const setImages = () => {
    const index = idToIndex(response.imageable.id, state);
    return state.setIn([index, 'images'], fromJS(response.images));
  };

  switch (action.type) {
    case types.FETCH_INSTRUCTIONS_SUCCESS:
      return fromJS(response);

    case types.UPDATE_INSTRUCTION_SUCCESS:
      return fromJS(response);

    case types.CREATE_INSTRUCTION_SUCCESS:
      return fromJS(response);

    case types.DELETE_INSTRUCTION_SUCCESS:
      return fromJS(response);

    case CREATE_IMAGE_SUCCESS:
      if (!isInstructionImage()) return state;
      return setImages();

    case DELETE_IMAGE_SUCCESS:
      if (!isInstructionImage()) return state;
      return setImages();

    default:
      return state;
  }
}

export default ProjectInstructionsReducer;
