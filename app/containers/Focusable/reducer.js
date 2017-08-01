import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  id: null,
  action: null,
});

function focusReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.FOCUS:
      return fromJS(payload);
    default:
      return state;
  }
}

export default focusReducer;
