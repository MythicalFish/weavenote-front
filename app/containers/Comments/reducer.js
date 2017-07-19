import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  isUpdating: false,
  isCreating: false,
});

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.START_CREATE_COMMENT:
      return state.set('isCreating', true).set('isUpdating', false);

    case types.START_UPDATE_COMMENT:
      return state.set('isCreating', false).set('isUpdating', true);

    case types.START_REPLY_COMMENT:
      return state.set('isCreating', false).set('isUpdating', false);

    case types.UPDATE_COMMENT_SUCCESS:
      return state.set('isCreating', false).set('isUpdating', false);

    default:
      return state;
  }
}

export default commentsReducer;
