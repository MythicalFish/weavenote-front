import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS([]);

function materialsReducer(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case types.FETCH_MATERIALS_SUCCESS:
      return fromJS(response);

    case types.DELETE_MATERIAL_SUCCESS:
      return fromJS(response);

    default:
      return state;
  }
}

export default materialsReducer;
