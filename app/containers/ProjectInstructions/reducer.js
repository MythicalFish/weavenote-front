import { fromJS } from 'immutable';
import * as iTypes from 'containers/ImageManager/constants';
import * as types from './constants';

const initialState = fromJS({
  instructions: [],
  currentInstruction: null,
});

function instructionReducer(state = initialState, action) {
  const currentInstruction = state.get('currentInstruction');

  switch (action.type) {
    case types.FETCH_INSTRUCTIONS_SUCCESS:
      return state.set('instructions', fromJS(action.instructions));

    case types.UPDATE_INSTRUCTION_SUCCESS:
      return state
        .setIn(['instructions', currentInstruction], fromJS(action.instruction))
        .set('currentInstruction', null);

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

    case iTypes.CREATE_IMAGE_SUCCESS:
      if (action.response.imageable_type === 'Instruction') {
        return state.setIn(
          ['instructions', currentInstruction, 'images'],
          fromJS(action.response.images)
        );
      }
      return state;

    default:
      return state;
  }
}

export default instructionReducer;
