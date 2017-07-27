import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  annotation: {
    maxAnchors: 1,
    annotatable: null,
    anchors: [],
    type: null,
  },
});

function projectImagesReducer(state = initialState, action) {
  const annotation = state.get('annotation');
  const maxAnchors = annotation.get('maxAnchors');
  const anchors = annotation.get('anchors');
  const { payload } = action;
  const setAnchor = (i) => state.setIn(['annotation', 'anchors', i], payload);

  switch (action.type) {
    case types.CANCEL_ANNOTATION:
      return initialState;

    case types.ADD_ANNOTATION:
      return state
        .setIn(['annotation', 'maxAnchors'], payload.maxAnchors)
        .setIn(['annotation', 'annotatable'], payload.annotatable)
        .setIn(['annotation', 'type'], payload.type);

    case types.SET_ANNOTATION:
      if (maxAnchors === 1) {
        return setAnchor(0);
      } else if (maxAnchors === anchors.size) {
        return setAnchor(0).deleteIn(['annotation', 'anchors', 1]);
      }
      return setAnchor(anchors.size);

    default:
      return state;
  }
}

export default projectImagesReducer;
