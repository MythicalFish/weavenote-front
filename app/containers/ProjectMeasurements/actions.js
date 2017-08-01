import * as types from './constants';

export function fetchMeasurements(projectID) {
  return { type: types.FETCH_MEASUREMENTS, projectID };
}

export function fetchMeasurementsSuccess(response) {
  return { type: types.FETCH_MEASUREMENTS_SUCCESS, response };
}

export function updateMeasurements() {
  return { type: types.UPDATE_MEASUREMENTS };
}

export function updateMeasurementsSuccess(response) {
  return { type: types.UPDATE_MEASUREMENTS_SUCCESS, response };
}

export function createMeasurementGroup(projectID) {
  return { type: types.CREATE_MEASUREMENT_GROUP, projectID };
}

export function createMeasurementGroupSuccess(response) {
  return { type: types.CREATE_MEASUREMENT_GROUP_SUCCESS, response };
}

export function createMeasurementName(projectID) {
  return { type: types.CREATE_MEASUREMENT_NAME, projectID };
}

export function createMeasurementNameSuccess(response) {
  return { type: types.CREATE_MEASUREMENT_NAME_SUCCESS, response };
}
