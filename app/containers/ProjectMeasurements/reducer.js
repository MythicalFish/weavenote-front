import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  measurements: [],
});

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MEASUREMENTS_SUCCESS:
      return state.set('measurements', fromJS(action.measurements));

    case types.UPDATE_MEASUREMENTS_SUCCESS:
      const { measurements } = action.response;
      return state.set('measurements', fromJS(measurements));

    case types.CREATE_MEASUREMENT_GROUP:
      return state.set('measurements', fromJS([]));

    case types.CREATE_MEASUREMENT_GROUP_SUCCESS:
      return state.set('measurements', fromJS(action.measurements));

    case types.CREATE_MEASUREMENT_NAME:
      return state.set('measurements', fromJS([]));

    case types.CREATE_MEASUREMENT_NAME_SUCCESS:
      return state.set('measurements', fromJS(action.measurements));

    default:
      return state;
  }
}

export default projectReducer;
