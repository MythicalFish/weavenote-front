import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { forInstruction } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS({
  instructions: [],
  currentInstruction: null,
});

function ProjectInstructionsReducer(state = initialState, action) {
  if (!forInstruction(action)) return state;

  const currentInstruction = state.get('currentInstruction');

  switch (action.type) {
    case types.FETCH_INSTRUCTIONS_SUCCESS:
      return state.set('instructions', fromJS(action.instructions));

    case types.UPDATE_INSTRUCTION_SUCCESS:
      return state.set('instructions', fromJS(action.instructions));

    case types.CREATE_INSTRUCTION:
      return state.set('currentInstruction', null);

    case types.CREATE_INSTRUCTION_SUCCESS:
      return state
        .set(
          'instructions',
          state.get('instructions').insert(0, fromJS(action.instruction))
        )
        .set('currentInstruction', 0); // TL;DR: insert at beginning of list

    case types.DELETE_INSTRUCTION_SUCCESS:
      return state
        .set('instructions', fromJS(action.instructions))
        .set('currentInstruction', null);

    case types.SWITCH_INSTRUCTION:
      return state.set('currentInstruction', action.index);

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
