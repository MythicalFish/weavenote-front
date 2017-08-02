import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  isUploading: false,
});

function uploadReducer(state = initialState, { type }) {
  switch (type) {
    case types.CREATE_IMAGE:
      return state.set('isUploading', true);
    case types.CREATE_IMAGE_SUCCESS:
      return state.set('isUploading', false);
    default:
      return state;
  }
}

export default uploadReducer;
