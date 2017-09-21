import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  maxAnchors: 1,
  annotatable: null,
  anchors: [],
  type: null,
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

    case types.START_ANNOTATION:
      return state
        .set('isAnnotating', true)
        .set('maxAnchors', payload.maxAnchors)
        .set('type', payload.type);

    case types.SET_ANNOTATION:
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
