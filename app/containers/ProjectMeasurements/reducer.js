import * as types from './constants';

/*
  Note: not using immutable for the data here,
  seems to impact performance.
*/

const initialState = null;

function ProjectMeasurementsReducer(state = initialState, action) {
  const { type, response, payload } = action;

  switch (type) {
    //
    case types.REORDER_MEASUREMENTS:
      return payload;

    case types.UPDATE_MEASUREMENTS_SUCCESS:
    case types.FETCH_MEASUREMENTS_SUCCESS:
    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
    case types.DELETE_MEASUREMENT_GROUP_SUCCESS:
    case types.DELETE_MEASUREMENT_NAME_SUCCESS:
      return response;

    default:
      return state;
  }
}

export default ProjectMeasurementsReducer;
