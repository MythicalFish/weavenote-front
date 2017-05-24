import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import * as types from '../../constants';

const supplierAttributes = (state) => {
  const attributes = {};
  state.getIn(['values', 'supplier']).mapKeys((key) => {
    attributes[key] = null;
  });
  return fromJS(attributes);
};

const labels = (state) => {
  return state.getIn(['values', 'care_labels']);
};

const labelCount = (state) => {
  return labels(state).size;
};

export default formReducer.plugin({
  Material: (state, action) => {

    switch (action.type) {

      case types.UPDATE_MATERIAL_SUCCESS:
        return state
          .set('values', fromJS(action.material));

      case types.NEW_SUPPLIER:
        return state
          .setIn(['values', 'supplier'], supplierAttributes(state));

      case types.ADD_CARE_LABEL:
        return state
          .setIn(['values', 'care_labels', labelCount(state)], action.label);
      
      case types.REMOVE_CARE_LABEL:
        return state
          .deleteIn(['values', 'care_labels', action.payload.index]);

      default:
        return state;
    }
  },
});
