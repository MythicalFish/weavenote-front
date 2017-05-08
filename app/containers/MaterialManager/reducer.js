
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  material: null,
  materialTypes: null,
});

function materialReducer(state = initialState, action) {

  switch (action.type) {

    // Material

    case types.FETCH_MATERIAL:
      return state
        .set('material', null);

    case types.FETCH_MATERIAL_SUCCESS:
      return state
        .set('material', fromJS(action.material));

    case types.UPDATE_MATERIAL_SUCCESS:
      return state;

    // Material types

    case types.FETCH_MATERIAL_TYPES_SUCCESS:
      return state
        .set('materialTypes', fromJS(action.materialTypes));

    default:
      return state;  

  }
}

export default materialReducer;
