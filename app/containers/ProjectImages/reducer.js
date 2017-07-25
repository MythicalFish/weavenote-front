import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  annotation: null,
});

function projectImagesReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ANNOTATION:
      return state.set('annotation', fromJS({ annotable: action.payload }));
    case types.CANCEL_ANNOTATION:
      return state.set('annotation', null);
    case types.SET_ANNOTATION:
      return state.setIn(['annotation', 'position'], action.payload);
    default:
      return state;
  }
}

export default projectImagesReducer;
