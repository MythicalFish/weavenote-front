import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({ all: [], filtered: [] });

const filtered = (list, text = '') => {
  // Returns array of keys of a filtered list
  const f = [];
  const t = text.toLowerCase();
  list.toJS().forEach((p, key) => {
    const a = [p.name, p.ref_number, p.collection];
    a.forEach((v) => {
      if (t.length === 0) f.push(key);
      if (v && v.toLowerCase().includes(t)) {
        f.push(key);
        return null;
      }
      return null;
    });
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
      return state
        .set('all', fromJS(response))
        .set('filtered', filtered(fromJS(response)));

    case types.FILTER_PROJECTS:
      return state.set('filtered', filtered(state.get('all'), action.text));

    default:
      return state;
  }
}

export default projectsReducer;
