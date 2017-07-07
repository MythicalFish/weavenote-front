import * as types from './constants';

/*
 *
 *  Project attributes
 *
 */

export function fetchProject(id) {
  return { type: types.FETCH_PROJECT, id };
}
export function fetchProjectSuccess(data) {
  return { type: types.FETCH_PROJECT_SUCCESS, data };
}

export function updateProject(project) {
  return { type: types.UPDATE_PROJECT, project };
}
export function updateProjectSuccess() {
  return { type: types.UPDATE_PROJECT_SUCCESS };
}

/*
 *
 *  Project components (materials)
 *
 */

export function fetchComponents(projectID) {
  return { type: types.FETCH_COMPONENTS, projectID };
}

export function fetchComponentsSuccess(components) {
  return { type: types.FETCH_COMPONENTS_SUCCESS, components };
}

export function updateComponent(component) {
  return { type: types.UPDATE_COMPONENT, component };
}

export function updateComponentSuccess(component) {
  return { type: types.UPDATE_COMPONENT_SUCCESS, component };
}

export function createComponent(payload) {
  return { type: types.CREATE_COMPONENT, payload };
}

export function createComponentSuccess(component) {
  return { type: types.CREATE_COMPONENT_SUCCESS, component };
}

export function deleteComponent({ projectID, id }) {
  return { type: types.DELETE_COMPONENT, projectID, id };
}

export function deleteComponentSuccess(components) {
  return { type: types.DELETE_COMPONENT_SUCCESS, components };
}

export function switchComponent(index) {
  return { type: types.SWITCH_COMPONENT, index };
}

export function fetchMaterialCost(component) {
  return { type: types.FETCH_MATERIAL_COST, component };
}

export function fetchMaterialCostSuccess(cost) {
  return { type: types.FETCH_MATERIAL_COST_SUCCESS, cost };
}

/*
 *
 *  Project instructions
 *
 */

export function fetchInstructions(projectID) {
  return { type: types.FETCH_INSTRUCTIONS, projectID };
}

export function fetchInstructionsSuccess(instructions) {
  return { type: types.FETCH_INSTRUCTIONS_SUCCESS, instructions };
}

export function updateInstruction(payload) {
  return { type: types.UPDATE_INSTRUCTION, payload };
}

export function updateInstructionSuccess(instruction) {
  return { type: types.UPDATE_INSTRUCTION_SUCCESS, instruction };
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

/*
 *
 *  Measurements
 *
 */

export function fetchMeasurements(projectID) {
  return { type: types.FETCH_MEASUREMENTS, projectID };
}

export function fetchMeasurementsSuccess(measurements) {
  return { type: types.FETCH_MEASUREMENTS_SUCCESS, measurements };
}

export function updateMeasurements(measurements) {
  return { type: types.UPDATE_MEASUREMENTS, measurements };
}

export function updateMeasurementsSuccess(response) {
  return { type: types.UPDATE_MEASUREMENTS_SUCCESS, response };
}

export function createMeasurementGroup(projectID) {
  return { type: types.CREATE_MEASUREMENT_GROUP, projectID };
}

export function createMeasurementGroupSuccess(measurements) {
  return { type: types.CREATE_MEASUREMENT_GROUP_SUCCESS, measurements };
}

export function createMeasurementName(projectID) {
  return { type: types.CREATE_MEASUREMENT_NAME, projectID };
}

export function createMeasurementNameSuccess(measurements) {
  return { type: types.CREATE_MEASUREMENT_NAME_SUCCESS, measurements };
}
