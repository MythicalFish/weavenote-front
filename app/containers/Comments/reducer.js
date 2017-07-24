import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  isUpdating: null,
  isCreating: false,
  isReplying: null,
  currentComment: null,
  annotation: null,
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

    case types.START_CREATE_COMMENT:
      return state
        .set('isCreating', true)
        .set('currentComment', null)
        .set('isUpdating', null)
        .set('isReplying', null);

    case types.START_UPDATE_COMMENT:
      return state
        .set('isCreating', false)
        .set('isUpdating', id(action))
        .set('isReplying', null);

    case types.START_REPLY_COMMENT:
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

    case types.START_ANNOTATION:
      return state.set('annotation', action.payload);

    default:
      return state;
  }
}

export default commentsReducer;
