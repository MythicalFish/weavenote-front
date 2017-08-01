import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  id: null,
});

function focusReducer(state = initialState, { type, id }) {
  switch (type) {
    case types.FOCUS:
      return state.set('id', id);
    default:
      return state;
  }
}

export default focusReducer;
