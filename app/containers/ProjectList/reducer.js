import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({ all: [], filtered: [] });

const filtered = (state, text) => {
  if (text.length === 0) return [];
  const f = [];
  state.get('all').forEach((project, key) => {
    if (
      !project
        .get('name')
        .toLowerCase()
        .includes(text.toLowerCase())
    ) {
      f.push(key);
    }
  });
  return f;
};

function projectsReducer(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case types.FETCH_PROJECTS_SUCCESS:
    case types.CREATE_PROJECT_SUCCESS:
    case types.DELETE_PROJECT_SUCCESS:
    case types.FILE_PROJECT_SUCCESS:
    case types.DUPLICATE_PROJECT_SUCCESS:
      return state.set('all', fromJS(response));

    case types.FILTER_PROJECTS:
      return state.set('filtered', filtered(state, action.text));

    default:
      return state;
  }
}

export default projectsReducer;
