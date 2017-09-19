import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  data: null,
  currentName: null,
  currentGroup: null,
});

function ProjectMeasurementsReducer(state = initialState, action) {
  const { type, response, payload } = action;
  const setData = () => state.set('data', fromJS(response));

  switch (type) {
    //
    case types.FETCH_MEASUREMENTS_SUCCESS:
      return setData();
    case types.UPDATE_MEASUREMENTS_SUCCESS:
      return setData();
    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
      return setData();
    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
      return setData();
    case types.DELETE_MEASUREMENT_GROUP_SUCCESS:
      return setData();
    case types.DELETE_MEASUREMENT_NAME_SUCCESS:
      return setData();
    case types.REORDER_MEASUREMENT_NAMES:
      return state.setIn(['data', 'names'], fromJS(payload.names));

    default:
      return state;
  }
}

export default ProjectMeasurementsReducer;
