import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import * as types from './constants';

const initialState = fromJS({
  instructions: [],
});

function ProjectInstructionsReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    case types.FETCH_INSTRUCTIONS_SUCCESS:
      return state.set('instructions', fromJS(response));

    case types.UPDATE_INSTRUCTION_SUCCESS:
      return state.set('instructions', fromJS(response));

    case types.CREATE_INSTRUCTION_SUCCESS:
      return state.set('instructions', fromJS(response));

    case types.DELETE_INSTRUCTION_SUCCESS:
      return state.set('instructions', fromJS(response));

    // Images

    case CREATE_IMAGE_SUCCESS:
      return state.setIn(
        ['instructions', currentInstruction, 'images'],
        fromJS(action.response.images)
      );

    default:
      return state;
  }
}

export default ProjectInstructionsReducer;
