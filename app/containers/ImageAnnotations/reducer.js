import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  maxAnchors: 1,
  annotatable: null,
  anchors: [],
  type: null,
  imageID: null,
});

function ImageAnnotationsWatcher(state = initialState, action) {
  //
  const { payload, type } = action;
  const maxAnchors = state.get('maxAnchors');
  const anchors = state.get('anchors');
  const setAnchor = (i) => state.setIn(['anchors', i], fromJS(payload));

  switch (type) {
    //
    case types.CANCEL_ANNOTATION:
      return initialState;

    case types.SET_ANNOTATION:
      return fromJS(Object.assign(state.toJS(), payload));

    case types.SET_ANCHOR:
      if (maxAnchors === 1) {
        return setAnchor(0);
      } else if (maxAnchors === anchors.size) {
        return setAnchor(0).deleteIn(['anchors', 1]);
      }
      return setAnchor(anchors.size);

    case types.CREATE_ANNOTATION_SUCCESS:
      return initialState;

    default:
      return state;
  }
}

export default ImageAnnotationsWatcher;
