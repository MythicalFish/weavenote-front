import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS([]);

function projectsReducer(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return fromJS(response);

    case types.CREATE_PROJECT_SUCCESS:
      return fromJS(response);

    case types.DELETE_PROJECT_SUCCESS:
      return fromJS(response);

    case types.FILE_PROJECT_SUCCESS:
      return fromJS(response);

    default:
      return state;
  }
}

export default projectsReducer;
