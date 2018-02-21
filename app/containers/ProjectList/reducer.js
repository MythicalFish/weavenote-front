import { fromJS } from 'immutable';
import { filtered } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS({ all: [], filtered: [], isLoading: false });

const filterAttributes = ['name', 'ref_number', 'collection'];

function projectsReducer(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case types.FETCH_PROJECTS:
    case types.DELETE_PROJECT:
    case types.DUPLICATE_PROJECT:
    case types.FILE_PROJECT:
      return state
        .set('isLoading', true);

    case types.FETCH_PROJECTS_SUCCESS:
    case types.CREATE_PROJECT_SUCCESS:
    case types.DELETE_PROJECT_SUCCESS:
    case types.FILE_PROJECT_SUCCESS:
    case types.DUPLICATE_PROJECT_SUCCESS:
      return state
        .set('isLoading', false)
        .set('all', fromJS(response))
        .set('filtered', filtered(fromJS(response), filterAttributes));

    case types.FILTER_PROJECTS:
      return state.set(
        'filtered',
        filtered(state.get('all'), filterAttributes, action.text)
      );

    default:
      return state;
  }
}

export default projectsReducer;
