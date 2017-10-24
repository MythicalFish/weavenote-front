import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  components: [],
  selectedMaterials: [],
});

function ProjectComponentsReducer(state = initialState, action) {
  const { response, payload } = action;
  const selectedMaterials = () => {
    const newID = payload.get('id');
    const list = state.get('selectedMaterials');
    const index = list.findKey((id) => id === newID);
    if (index !== undefined) {
      return state.set('selectedMaterials', list.delete(index));
    }
    return state.setIn(['selectedMaterials', list.size], newID);
  };
  switch (action.type) {
    case types.FETCH_COMPONENTS_SUCCESS:
      return state.set('components', fromJS(response));

    case types.UPDATE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(response));

    case types.CREATE_COMPONENTS_SUCCESS:
      return initialState.set('components', fromJS(response));

    case types.DELETE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(response));

    case types.SELECT_MATERIAL:
      return selectedMaterials();

    default:
      return state;
  }
}

export default ProjectComponentsReducer;
