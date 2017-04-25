/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  currentPage: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state;
    case types.GET_CURRENT_PAGE_NAME:
      return state
        .set('currentPage', action.path);
    default:
      return state;
  }
}

export default appReducer;
