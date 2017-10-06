import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  data: null,
  updated: null,
});

function ProjectMeasurementsReducer(state = initialState, action) {
  const { type, response, payload } = action;
  const setData = () => state.set('data', response).set('updated', null);

  switch (type) {
    //
    case types.REORDER_MEASUREMENTS:
      return state.set('data', payload);
    case types.UPDATE_MEASUREMENTS_SUCCESS:
    case types.FETCH_MEASUREMENTS_SUCCESS:
    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
    case types.DELETE_MEASUREMENT_GROUP_SUCCESS:
    case types.DELETE_MEASUREMENT_NAME_SUCCESS:
      return setData();

    default:
      return state;
  }
}

export default ProjectMeasurementsReducer;
