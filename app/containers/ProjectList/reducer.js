
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants/actions';

const initialState = fromJS({
  list: false,
});

function projectsReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case types.LIST_PROJECTS_SUCCESS:
      return state
        .set('list', action.list);

    case types.CREATE_PROJECT_SUCCESS:
      return state
        .set('list', action.list);

    case types.ARCHIVE_PROJECT_SUCCESS:
      return state
        .set('list', action.list);

    default:
      return state;
  }
}

export default projectsReducer;
