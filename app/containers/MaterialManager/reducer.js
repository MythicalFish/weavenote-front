import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import * as types from './constants';

const initialState = fromJS({
  material: null,
});

function materialReducer(state = initialState, action) {
  const { type, response, payload } = action;

  const setMaterial = () => state.set('material', fromJS(response));

  const isMaterialImage = () => response.imageable.type === 'Material';

  const labelIDs = () => state.getIn(['material', 'care_label_ids']);
  const labelIndex = (label) => {
    const id = label.get('id');
    return idToIndex(id, labelIDs());
  };
  const labelIsAdded = (label) => !!labelIndex(label);

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
      return state.setIn(['material', 'image'], fromJS(response.image));

    case DELETE_IMAGE_SUCCESS:
      if (!isMaterialImage()) return state;
      return state.setIn(['material', 'image'], fromJS([]));

    case types.TOGGLE_CARE_LABEL:
      if (labelIsAdded(payload)) {
        return state.removeIn(['care_label_ids', labelIndex(payload)]);
      } else {
        return state.setIn(
          ['care_label_ids', labelIDs().size],
          payload.get('id')
        );
      }

    default:
      return state;
  }
}

export default materialReducer;
