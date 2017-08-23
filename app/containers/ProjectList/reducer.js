import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS([]);

function projectsReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case types.FETCH_PROJECTS_SUCCESS:
      return fromJS(action.list);

    case types.CREATE_PROJECT_SUCCESS:
      return fromJS(action.list);

    case types.FILE_PROJECT_SUCCESS:
      return fromJS(action.list);

    default:
      return state;
  }
}

export default projectsReducer;
