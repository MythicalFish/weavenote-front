
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  list: false,
});

function projectsReducer(state = initialState, action) {

  const { type } = action;

  switch (type) {

    case types.FETCH_PROJECTS_SUCCESS:
      return state
        .set('list', action.list);

    case types.CREATE_PROJECT_SUCCESS:
      return state
        .set('list', action.list);

    case types.FILE_PROJECT_SUCCESS:
      return state
        .set('list', action.list);

    default:
      return state;
  }
}

export default projectsReducer;
