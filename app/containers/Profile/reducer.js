
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
});

function profileReducer(state = initialState, action) {

  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}

export default profileReducer;
