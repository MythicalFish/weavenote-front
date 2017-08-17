import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  isUploading: null,
});

function uploadReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.UPLOAD_IMAGE:
      return state.set('isUploading', payload.imageable);
    case types.CREATE_IMAGE_SUCCESS:
      return state.set('isUploading', null);
    default:
      return state;
  }
}

export default uploadReducer;
