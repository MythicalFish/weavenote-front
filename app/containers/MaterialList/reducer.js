import { fromJS } from 'immutable';
import { filtered } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS({ all: [], filtered: [] });

const filterAttributes = [
  'name',
  'color',
  'reference',
  'supplier_name',
  ['type', 'name'],
];

function materialsReducer(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case types.FETCH_MATERIALS_SUCCESS:
    case types.DELETE_MATERIAL_SUCCESS:
    case types.DUPLICATE_MATERIAL_SUCCESS:
      return state
        .set('all', fromJS(response))
        .set('filtered', filtered(fromJS(response), filterAttributes));

    case types.FILTER_MATERIALS:
      return state.set(
        'filtered',
        filtered(state.get('all'), filterAttributes, action.text)
      );

    default:
      return state;
  }
}

export default materialsReducer;
