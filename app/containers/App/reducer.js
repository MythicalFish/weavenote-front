/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = fromJS({
  loading: false,
  error: false,
  currentPage: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state;
    default:
      return state;
  }
}

export default appReducer;
