import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import * as types from './constants';

const initialState = fromJS({
  material: {
    supplier: {},
  },
  suppliers: null,
  care_labels: [],
});

const labels = (state) => state.get('care_labels');

const labelIndex = (state, label) =>
  labels(state).findKey((obj) => obj.get('id') === label.get('id'));

const labelCount = (state) => labels(state).size;

function materialReducer(state = initialState, action) {
  const { type, response } = action;

  const setMaterial = () => state.set('material', fromJS(response));

  const isMaterialImage = () => response.imageable.type === 'Material';

  switch (type) {
    // Material

    case types.FETCH_MATERIAL:
      return state.set('material', null);

    case types.FETCH_MATERIAL_SUCCESS:
      const m = action.material;
      if (!m.supplier) m.supplier = { name: null };
      return state.set('material', fromJS(m));

    case types.UPDATE_MATERIAL_SUCCESS:
      return setMaterial();

    case types.CREATE_MATERIAL_SUCCESS:
      return setMaterial();

    case CREATE_IMAGE_SUCCESS:
      if (!isMaterialImage()) return state;
      return state.setIn(['material', 'images'], fromJS(response.images));

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
