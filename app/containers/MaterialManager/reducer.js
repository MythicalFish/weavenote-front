import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import * as types from './constants';

const initialState = fromJS({
  material: {
    supplier: {},
  },
  suppliers: null,
});

const labels = (state) => state.get('care_labels');

const labelIndex = (state, label) =>
  labels(state).findKey((obj) => obj.get('id') === label.get('id'));

const labelCount = (state) => labels(state).size;

const suppliers = (state) => state.get('suppliers');

const supplierIndex = (state, supplier) =>
  suppliers(state).findKey((obj) => obj.get('id') === supplier.id);

function materialReducer(state = initialState, action) {
  //
  const stateSetMaterial = () =>
    state
      .set('material', fromJS(action.material))
      .setIn(
        ['suppliers', supplierIndex(state, action.material.supplier)],
        fromJS(action.material.supplier)
      );

  const isMaterialImage = () => action.response.imageable.type === 'Material';

  switch (action.type) {
    // Material

    case types.FETCH_MATERIAL:
      return state.set('material', null);

    case types.FETCH_MATERIAL_SUCCESS:
      const m = action.material;
      if (!m.supplier) m.supplier = { name: null };
      return state.set('material', fromJS(m));

    case types.UPDATE_MATERIAL_SUCCESS:
      return stateSetMaterial();

    case types.CREATE_MATERIAL_SUCCESS:
      return stateSetMaterial();

    case CREATE_IMAGE_SUCCESS:
      if (!isMaterialImage()) return state;
      return state.setIn(
        ['material', 'images'],
        fromJS(action.response.images)
      );

    case DELETE_IMAGE_SUCCESS:
      if (!isMaterialImage()) return state;
      return state.setIn(['material', 'images'], fromJS([]));

    // Care Labels

    case types.ADD_CARE_LABEL: // deletes here, adds in form state
      return state.deleteIn(['care_labels', labelIndex(state, action.label)]);

    case types.REMOVE_CARE_LABEL: // adds here, deletes in form state
      return state.setIn(
        ['care_labels', labelCount(state)],
        action.payload.label
      );

    default:
      return state;
  }
}

export default materialReducer;
