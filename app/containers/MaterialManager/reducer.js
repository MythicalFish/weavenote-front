
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  currentMaterial: null,
});

function materialReducer(state = initialState, action) {

  switch (action.type) {

    case types.FETCH_MATERIAL:
      return state
        .set('material', null);

    case types.FETCH_MATERIAL_SUCCESS:
      return state
        .set('material', fromJS(action.material));

    case types.UPDATE_MATERIAL_SUCCESS:
      return state;

    default:
      return state;  

  }
}

export default materialReducer;
