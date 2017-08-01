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

    //
    case types.UNFOCUS_MEASUREMENTS:
      return state.set('currentName', null).set('currentGroup', null);

    case types.FOCUS_MEASUREMENT_NAME:
      return state.set('currentName', action.index).set('currentGroup', null);

    case types.FOCUS_MEASUREMENT_GROUP:
      return state.set('currentName', null).set('currentGroup', action.index);

    default:
      return state;
  }
}

export default ProjectMeasurementsReducer;
