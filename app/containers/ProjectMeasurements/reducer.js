import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  data: null,
  currentName: null,
  currentGroup: null,
});

function ProjectMeasurementsReducer(state = initialState, action) {
  const { type, response, payload } = action;
  const setData = () => state.set('data', response);

  switch (type) {
    //
    case types.SET_MEASUREMENTS:
      return state.set(
        'data',
        state.get('data')[payload.type][payload.index][payload.attribute][
          payload.value
        ]
      );
    case types.FETCH_MEASUREMENTS_SUCCESS:
    case types.UPDATE_MEASUREMENTS_SUCCESS:
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
