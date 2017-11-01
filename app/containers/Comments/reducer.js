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

  const initialActions = () =>
    state.set('actions', initialState.get('actions'));
  const setComments = () =>
    state.setIn(['data', response.commentable], fromJS(response.comments));

  switch (type) {
    // Init

    case types.FETCH_COMMENTS_SUCCESS:
      return setComments();

    // Actions

    case types.FOCUS_COMMENT:
      return initialActions().setIn(
        ['actions', 'currentComment'],
        commentID(payload)
      );

    case types.WRITE_COMMENT:
      return initialActions().setIn(['actions', 'isCreating'], true);

    case types.EDIT_COMMENT:
      return state
        .setIn(['actions', 'isCreating'], false)
        .setIn(['actions', 'isEditing'], commentID(payload))
        .setIn(['actions', 'isReplying'], null);

    case types.WRITE_REPLY:
      return state
        .setIn(['actions', 'currentComment'], commentID(payload))
        .setIn(['actions', 'isCreating'], false)
        .setIn(['actions', 'isEditing'], null)
        .setIn(['actions', 'isReplying'], commentID(payload));

    case types.CREATE_COMMENT_SUCCESS:
    case types.UPDATE_COMMENT_SUCCESS:
    case types.DELETE_COMMENT_SUCCESS:
      return setComments()
        .setIn(['actions', 'isCreating'], false)
        .setIn(['actions', 'isEditing'], null)
        .setIn(['actions', 'isReplying'], null);

    case types.CANCEL_COMMENT_ACTION:
      return initialActions();

    // Annotation

    case FOCUS_ANNOTATION:
      return initialActions().setIn(
        ['actions', 'currentComment'],
        annotationComment(payload)
      );

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
