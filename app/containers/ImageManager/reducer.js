import { fromJS } from 'immutable';
import { forProject } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS({
  modalImage: null,
});

function imageReducer(state = initialState, action) {
  if (forProject(action)) return state;

  switch (action.type) {
    case types.SWITCH_IMAGE:
      return state.set('modalImage', action.payload.image);

    default:
      return state;
  }
}

export default imageReducer;
