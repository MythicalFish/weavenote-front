
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  project: null,
  currentImage: null,
  components: null,
});

function projectReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {
    
    case types.FETCH_PROJECT:
      return state
        .set('project', null);
      
    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('project', fromJS(action.data));
      
    case types.UPDATE_PROJECT_SUCCESS:
      return state;
    
    case types.FETCH_COMPONENTS_SUCCESS:
      return state
        .set('components', fromJS(action.components));
      
    case types.CREATE_IMAGE_SUCCESS:
      const image = fromJS(payload.image);
      return state
        .setIn(['project', 'images', -1], image)
        .set('currentImage', image);
    
    case types.SELECT_IMAGE:
      return state
        .set('currentImage', fromJS(payload));
      
    default:
      return state;
  }
}

export default projectReducer;
