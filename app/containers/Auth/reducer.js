/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LOCK:
      return state;
    case types.LOCK_SUCCESS:
      return state
        .set('logged_in', true)
        .set('user_data', action.user_data);
    case types.LOCK_ERROR:
      return state;
    default:
      return state;
  }
}

export default authReducer;
