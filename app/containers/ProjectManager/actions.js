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
