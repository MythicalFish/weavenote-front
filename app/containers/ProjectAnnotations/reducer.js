import { fromJS } from 'immutable';
import assign from 'assign-deep';
import * as types from './constants';
import { FETCH_PROJECT_SUCCESS } from '../ProjectManager/constants';
import { FOCUS_COMMENT } from '../Comments/constants';

const initialState = fromJS({
  existing: [],
  focused: {},
  isAnnotating: false,
  isEditingLabel: false,
  new: {
    maxAnchors: 1,
    annotatable: null,
    anchors: [],
    type: null,
    imageID: null,
  },
});

function AnnotationsReducer(state = initialState, action) {
  //
  const { response, payload, type } = action;
  const maxAnchors = state.getIn(['new', 'maxAnchors']);
  const anchors = state.getIn(['new', 'anchors']);

  const setAnchor = (i) => state.setIn(['new', 'anchors', i], fromJS(payload));
  const buildAnnotation = () =>
    state.set('new', fromJS(assign(state.get('new').toJS(), payload)));
  const resetState = (r = null) =>
    initialState.set('existing', r || state.get('existing'));

  const commentAnnotation = () => payload.comment.getIn(['annotation', 'id']);

  switch (type) {
    //
    case types.FETCH_ANNOTATIONS_SUCCESS:
      return state.set('existing', fromJS(response));

    case FETCH_PROJECT_SUCCESS:
      return state.set('existing', fromJS(response.annotations));

    case types.FOCUS_ANNOTATION:
      return state.set('focused', payload.get('id'));

    case FOCUS_COMMENT:
      return state.set('focused', commentAnnotation());

    case types.START_ANNOTATION:
      return buildAnnotation().set('isAnnotating', true);

    case types.BUILD_ANNOTATION:
      return buildAnnotation();

    case types.CANCEL_ANNOTATION:
      return resetState();

    case types.SET_ANCHOR:
      if (maxAnchors === 1) {
        return setAnchor(0);
      } else if (maxAnchors === anchors.size) {
        return setAnchor(0).deleteIn(['anchors', 1]);
      }
      return setAnchor(anchors.size);

    case types.UPDATE_ANNOTATION_SUCCESS:
      return state
        .set('existing', fromJS(response))
        .set('isEditingLabel', false);

    case types.CREATE_ANNOTATION_SUCCESS:
    case types.DELETE_ANNOTATION_SUCCESS:
      return resetState(fromJS(response));

    case types.EDIT_LABEL:
      return state.set('isEditingLabel', true);

    default:
      return state;
  }
}

export default AnnotationsReducer;
