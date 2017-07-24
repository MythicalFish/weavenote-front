import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  annotation: null,
});

function projectImagesReducer(state = initialState, action) {
  switch (action.type) {
    case types.START_ANNOTATION:
      return state.set('annotation', { annotable: action.payload });
    case types.SET_ANNOTATION:
      return state.set('annotation', { position: action.payload });
    default:
      return state;
  }
}

export default projectImagesReducer;
