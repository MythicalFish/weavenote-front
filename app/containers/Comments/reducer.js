import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  isUpdating: null,
  isCreating: false,
  isReplying: null,
  currentComment: null,
});

function commentsReducer(state = initialState, action) {
  const id = ({ payload }) => payload.comment.get('id');
  switch (action.type) {
    case types.SWITCH_COMMENT:
      return state
        .set('currentComment', id(action))
        .set('isCreating', false)
        .set('isUpdating', null)
        .set('isReplying', null);

    case types.WRITE_COMMENT:
      return state
        .set('isCreating', true)
        .set('currentComment', null)
        .set('isUpdating', null)
        .set('isReplying', null);

    case types.EDIT_COMMENT:
      return state
        .set('isCreating', false)
        .set('isUpdating', id(action))
        .set('isReplying', null);

    case types.WRITE_REPLY:
      return state
        .set('isCreating', false)
        .set('isUpdating', null)
        .set('isReplying', id(action));

    case types.UPDATE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isUpdating', null)
        .set('isReplying', null);

    case types.DELETE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isUpdating', null)
        .set('isReplying', null);

    case types.CREATE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isUpdating', null)
        .set('isReplying', null);

    default:
      return state;
  }
}

export default commentsReducer;
