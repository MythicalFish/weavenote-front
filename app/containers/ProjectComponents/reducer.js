import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  components: [],
  materialCost: 0,
});

function ProjectComponentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COMPONENTS_SUCCESS:
      return state.set('components', fromJS(action.response));

    case types.UPDATE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(action.response));

    case types.CREATE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(action.response));

    case types.DELETE_COMPONENT_SUCCESS:
      return state.set('components', fromJS(action.components));

    default:
      return state;
  }
}

export default ProjectComponentsReducer;
