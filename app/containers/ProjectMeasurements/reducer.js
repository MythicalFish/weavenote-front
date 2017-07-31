import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  data: null,
});

function ProjectMeasurementsReducer(state = initialState, { type, response }) {
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

    default:
      return state;
  }
}

export default ProjectMeasurementsReducer;
