import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = null;

function ProjectMeasurementsReducer(state = initialState, { type, response }) {
  switch (type) {
    case types.FETCH_MEASUREMENTS_SUCCESS:
      return fromJS(response);

    case types.UPDATE_MEASUREMENTS_SUCCESS:
      return fromJS(response);

    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
      return fromJS(response);

    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
      return fromJS(response);

    default:
      return state;
  }
}

export default ProjectMeasurementsReducer;
