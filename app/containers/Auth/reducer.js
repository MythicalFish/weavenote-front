/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  user: null,
});

function authReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default authReducer;
