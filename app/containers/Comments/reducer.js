import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  isUpdating: false,
  isCreating: false,
  isReplying: false,
});

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.START_CREATE_COMMENT:
      return state
        .set('isCreating', true)
        .set('isUpdating', false)
        .set('isReplying', false);

    case types.START_UPDATE_COMMENT:
      return state
        .set('isCreating', false)
        .set('isUpdating', true)
        .set('isReplying', false);

    case types.START_REPLY_COMMENT:
      return state
        .set('isCreating', false)
        .set('isUpdating', false)
        .set('isReplying', true);

    case types.UPDATE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isUpdating', false)
        .set('isReplying', false);

    default:
      return state;
  }
}

export default commentsReducer;
