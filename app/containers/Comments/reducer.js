import { fromJS } from 'immutable';
import * as types from './constants';
import { FOCUS_ANNOTATION } from '../ProjectAnnotations/constants';

const initialState = fromJS({
  isEditing: null,
  isCreating: false,
  isReplying: null,
  currentComment: null,
});

function commentsReducer(state = initialState, action) {
  const { type, payload } = action;
  const id = () => {
    if (payload && payload.comment) return payload.comment.get('id');
    return payload;
  };
  const annotationComment = () => {
    console.log(payload);
    if (payload) {
      const a = payload.annotatable;
      if (a && a.type === 'Comment') {
        return a.id;
      }
    }
    return null;
  };
  switch (action.type) {
    case types.CANCEL_COMMENT_ACTION:
      return initialState;

    case FOCUS_ANNOTATION:
      return initialState.set('currentComment', annotationComment());

    case types.FOCUS_COMMENT:
      return initialState.set('currentComment', id(action));

    case types.WRITE_COMMENT:
      return initialState.set('isCreating', true);

    case types.EDIT_COMMENT:
      return state
        .set('isCreating', false)
        .set('isEditing', id(action))
        .set('isReplying', null);

    case types.WRITE_REPLY:
      return state
        .set('currentComment', id(action))
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', id(action));

    case types.UPDATE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', null);

    case types.DELETE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', null);

    case types.CREATE_COMMENT_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', null);

    default:
      return state;
  }
}

export default commentsReducer;
