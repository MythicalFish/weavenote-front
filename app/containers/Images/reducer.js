

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({});

function imagesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_IMAGE:
      return state
        .set('currentImageID', action.payload.id);
    default:
      return state;
  }
}

export default imagesReducer;
