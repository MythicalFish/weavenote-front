import { fromJS } from 'immutable';
import assign from 'object-assign-deep';
import * as types from './constants';
import { FETCH_PROJECT_SUCCESS } from '../ProjectManager/constants';

const initialState = fromJS({
  existing: [],
  focused: null,
  isAnnotating: false,
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

  switch (type) {
    //
    case FETCH_PROJECT_SUCCESS:
      return state.set('existing', fromJS(response.annotations));

    case types.FOCUS_ANNOTATION:
      return state.set('focused', payload);

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

    case types.CREATE_ANNOTATION_SUCCESS:
      return resetState(fromJS(response));

    case types.UPDATE_ANNOTATION_SUCCESS:
      return resetState(fromJS(response));

    default:
      return state;
  }
}

export default AnnotationsReducer;
