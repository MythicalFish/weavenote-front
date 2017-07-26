import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  annotation: {
    type: null,
    annotatable: {},
    anchors: [],
  },
});

function projectImagesReducer(state = initialState, action) {
  const annotation = state.get('annotation');
  const type = annotation.get('type');
  const anchors = annotation.get('anchors');
  const { payload } = action;
  const setAnchor = (i) =>
    state.setIn(['annotation', 'anchors', i], fromJS(payload));

  switch (action.type) {
    case types.CANCEL_ANNOTATION:
      return initialState;

    case types.ADD_ANNOTATION:
      return state
        .setIn(['annotation', 'type'], payload.type)
        .setIn(['annotation', 'annotatable'], payload.annotatable);

    case types.SET_ANNOTATION:
      if (type === 'dot') {
        return setAnchor(0);
      } else if (type === 'line') {
        switch (anchors.size) {
          case 2:
            return setAnchor(0).deleteIn(['annotation', 'anchors', 1]);
          case 1:
            return setAnchor(1);
          case 0:
            return setAnchor(0);
          default:
            return state;
        }
      }
      return state;

    default:
      return state;
  }
}

export default projectImagesReducer;
