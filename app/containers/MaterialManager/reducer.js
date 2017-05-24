
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  material: {
    supplier: {},
  },
  materialTypes: null,
  colors: null,
  currencies: null,
  suppliers: null,
  care_labels: null,
});

const labelIndex = (state, label) => {
  return state.get('care_labels').findKey((obj) => (
    obj.get('id') === label.get('id')
  ));
}

function materialReducer(state = initialState, action) {

  switch (action.type) {

    // Material

    case types.FETCH_MATERIAL:
      return state
        .set('material', null);

    case types.FETCH_MATERIAL_SUCCESS:
      const m = action.material;
      if (!m.supplier) m.supplier = { name: null };
      return state
        .set('material', fromJS(m));

    case types.UPDATE_MATERIAL_SUCCESS:

      const suppliers = state.get('suppliers');

      let key = suppliers.findKey((obj) => (
        obj.get('id') === action.material.supplier.id
      ));

      if (!key) key = suppliers.size;

      return state
        .set('material', fromJS(action.material))
        .setIn(['suppliers', key], fromJS(action.material.supplier));

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

    // Suppliers

    case types.FETCH_SUPPLIERS_SUCCESS:
      return state
        .set('suppliers', fromJS(action.suppliers));
    
    // Care Labels

    case types.FETCH_CARE_LABELS_SUCCESS:
      return state
        .set('care_labels', fromJS(action.care_labels));

    case types.ADD_CARE_LABEL:
      return state
        .deleteIn(['care_labels', labelIndex(state, action.label)]);
      
    // Currencies

    case types.FETCH_CURRENCIES_SUCCESS:
      return state
        .set('currencies', fromJS(action.currencies));

    default:
      return state;

  }
}

export default materialReducer;
