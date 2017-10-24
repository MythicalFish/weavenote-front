import { fromJS } from 'immutable';
import * as types from './constants';
import { FOCUS_ANNOTATION } from '../ProjectAnnotations/constants';
import { setImages, commentID, annotationComment } from './reducerHelpers';
import {
  DELETE_IMAGE_SUCCESS,
  UPDATE_IMAGE_SUCCESS,
} from '../ImageForm/constants';
import { CREATE_IMAGE_SUCCESS } from '../ImageUploader/constants';

const initialState = fromJS({
  data: {},
  actions: {
    isEditing: null,
    isCreating: false,
    isReplying: null,
    currentComment: null,
  },
});

function commentsReducer(state = initialState, action) {
  const { type, payload, response } = action;

  const initialAction = () => state.set('actions', initialState.get('actions'));
  const setComments = () =>
    state.setIn(['data', response.commentable], fromJS(response.comments));

  switch (type) {
    // Init

    case types.FETCH_COMMENTS_SUCCESS:
      return setComments();

    // Actions

    case types.FOCUS_COMMENT:
      return initialAction().set('currentComment', commentID(payload));

    case types.WRITE_COMMENT:
      return initialAction().set('isCreating', true);

    case types.EDIT_COMMENT:
      return state
        .set('isCreating', false)
        .set('isEditing', commentID(payload))
        .set('isReplying', null);

    case types.WRITE_REPLY:
      return state
        .set('currentComment', commentID(payload))
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', commentID(payload));

    case types.CREATE_COMMENT_SUCCESS:
      return setComments()
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', null);

    case types.UPDATE_COMMENT_SUCCESS:
      return setComments()
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', null);

    case types.DELETE_COMMENT_SUCCESS:
      return setComments()
        .set('isCreating', false)
        .set('isEditing', null)
        .set('isReplying', null);

    case types.CANCEL_COMMENT_ACTION:
      return initialAction();

    // Annotation

    case FOCUS_ANNOTATION:
      return initialAction().set('currentComment', annotationComment(payload));

    // Images

    case CREATE_IMAGE_SUCCESS:
      return setImages(state, action);

    case DELETE_IMAGE_SUCCESS:
      return setImages(state, action);

    case UPDATE_IMAGE_SUCCESS:
      return setImages(state, action);

    default:
      return state;
  }
}

export default commentsReducer;
