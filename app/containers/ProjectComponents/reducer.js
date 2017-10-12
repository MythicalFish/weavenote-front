import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS({
  components: [],
  materialCost: 0,
  selectedMaterials: [],
});

function ProjectComponentsReducer(state = initialState, action) {
  const { response, payload } = action;
  const selectedMaterials = () => {
    const s = state.get('selectedMaterials');
    const i = idToIndex(payload, s);
    if (i) {
      return state.set('selectedMaterials', s.delete(i));
    } else {
      return state.setIn(['selectedMaterials', s.size], payload);
    }
  };
  switch (action.type) {
    case types.FETCH_COMPONENTS_SUCCESS:
      return state.set('components', fromJS(response));

    case types.UPDATE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(response));

    case types.CREATE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(response));

    case types.DELETE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(response));

    case types.SELECT_MATERIAL:
      return state.set('selectedMaterials', selectedMaterials());

    default:
      return state;
  }
}

export default ProjectComponentsReducer;
