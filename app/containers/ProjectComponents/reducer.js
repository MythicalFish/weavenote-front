import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  components: [],
  currentComponent: null,
  materialCost: 0,
});

function componentReducer(state = initialState, action) {
  const currentComponent = state.get('currentComponent');

  switch (action.type) {
    case types.FETCH_COMPONENTS_SUCCESS:
      return state.set('components', fromJS(action.response));

    case types.UPDATE_COMPONENT_SUCCESS:
      return state
        .setIn(['components', currentComponent], fromJS(action.response))
        .set('currentComponent', null);

    case types.CREATE_COMPONENT:
      return state.set('currentComponent', null);

    case types.CREATE_COMPONENT_SUCCESS:
      return state
        .set(
          'components',
          state.get('components').insert(0, fromJS(action.response))
        )
        .set('currentComponent', 0); // TL;DR: insert at beginning of list

    case types.DELETE_COMPONENT_SUCCESS:
      return state
        .set('components', fromJS(action.components))
        .set('currentComponent', null);

    case types.SWITCH_COMPONENT:
      return state.set('currentComponent', action.index);

    default:
      return state;
  }
}

export default componentReducer;
