
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  material: null,
  materialTypes: null,
  colors: null,
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

    case types.CREATE_MATERIAL_SUCCESS:
      return state
        .set('material', fromJS(action.material));

    // Material types

    case types.FETCH_MATERIAL_TYPES_SUCCESS:
      return state
        .set('materialTypes', fromJS(action.materialTypes));

    // Colors

    case types.FETCH_COLORS_SUCCESS:
      return state
        .set('colors', fromJS(action.colors));

    default:
      return state;  

  }
}

export default materialReducer;
