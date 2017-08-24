import * as types from './constants';

export function fetchInstructions(projectID) {
  return { type: types.FETCH_INSTRUCTIONS, projectID };
}

export function fetchInstructionsSuccess(instructions) {
  return { type: types.FETCH_INSTRUCTIONS_SUCCESS, instructions };
}

export function updateInstruction() {
  return { type: types.UPDATE_INSTRUCTION };
}

export function updateInstructionSuccess(instructions) {
  return { type: types.UPDATE_INSTRUCTION_SUCCESS, instructions };
}

export function createInstruction(payload) {
  return { type: types.CREATE_INSTRUCTION, payload };
}

export function createInstructionSuccess(instruction) {
  return { type: types.CREATE_INSTRUCTION_SUCCESS, instruction };
}

export function deleteInstruction({ projectID, id }) {
  return { type: types.DELETE_INSTRUCTION, projectID, id };
}

export function deleteInstructionSuccess(instructions) {
  return { type: types.DELETE_INSTRUCTION_SUCCESS, instructions };
}

export function switchInstruction(index) {
  return { type: types.SWITCH_INSTRUCTION, index };
}
