
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants';

const initialState = fromJS({
  currentProject: null,
  currentImage: null,
});

function projectReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case types.SHOW_PROJECT_SUCCESS:
      return state
        .set('currentProject', fromJS(action.data));
      
    case types.UPDATE_PROJECT_SUCCESS:
      return state;

    case types.CREATE_IMAGE_SUCCESS:
      const image = fromJS(payload.image);
      return state
        .setIn(['currentProject', 'images', -1], image)
        .set('currentImage', image);
    
    case types.SELECT_IMAGE:
      return state
        .set('currentImage', fromJS(payload));
      
    default:
      return state;
  }
}

export default projectReducer;
