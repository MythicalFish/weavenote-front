import * as types from './constants';

export function fetchInstructions(projectID) {
  return { type: types.FETCH_INSTRUCTIONS, projectID };
}

export function fetchInstructionsSuccess(response) {
  return { type: types.FETCH_INSTRUCTIONS_SUCCESS, response };
}

export function updateInstruction() {
  return { type: types.UPDATE_INSTRUCTION };
}

export function updateInstructionSuccess(response) {
  return { type: types.UPDATE_INSTRUCTION_SUCCESS, response };
}

export function createInstruction(payload) {
  return { type: types.CREATE_INSTRUCTION, payload };
}

export function createInstructionSuccess(response) {
  return { type: types.CREATE_INSTRUCTION_SUCCESS, response };
}

export function deleteInstruction({ projectID, id }) {
  return { type: types.DELETE_INSTRUCTION, projectID, id };
}

export function deleteInstructionSuccess(response) {
  return { type: types.DELETE_INSTRUCTION_SUCCESS, response };
}
