
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  list: false,
});

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list);
    default:
      return state;
  }
}

export default projectsReducer;
