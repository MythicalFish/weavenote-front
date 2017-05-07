import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({});

function materialManagerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default materialManagerReducer;
