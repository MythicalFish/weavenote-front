
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  list: false,
});

function materialsReducer(state = initialState, action) {

  const { type } = action;

  switch (type) {

    case types.FETCH_MATERIALS_SUCCESS:
      return state
        .set('list', action.list);

    default:
      return state;
  }
}

export default materialsReducer;
