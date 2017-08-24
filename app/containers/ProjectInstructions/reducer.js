import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import * as types from './constants';
import { idToIndex } from 'utils/reducerHelpers';

const initialState = fromJS([]);

function ProjectInstructionsReducer(state = initialState, action) {
  const { response } = action;

  const setImage = () => {
    const index = idToIndex(response.imageable.id, state);
    const instruction = state.get(index);
    const imgCount = instruction.get('images').size;
    return state.setIn([index, 'images', imgCount, fromJS(response)]);
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
      if (response.imageable.type !== 'Instruction') return state;
      return setImage();

    default:
      return state;
  }
}

export default ProjectInstructionsReducer;
