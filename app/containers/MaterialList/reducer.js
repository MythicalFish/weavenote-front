import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS([]);

function materialsReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case types.FETCH_MATERIALS_SUCCESS:
      return fromJS(action.materials);

    default:
      return state;
  }
}

export default materialsReducer;
