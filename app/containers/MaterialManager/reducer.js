import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import * as types from './constants';

const initialState = fromJS(null);

function materialReducer(state = initialState, action) {
  const { type, response, payload } = action;

  const isMaterialImage = () => response.imageable.type === 'Material';

  switch (type) {
    case types.FETCH_MATERIAL_SUCCESS:
    case types.CREATE_MATERIAL_SUCCESS:
      return fromJS(response);

    case CREATE_IMAGE_SUCCESS:
      if (!isMaterialImage()) return state;
      return state.set('image', fromJS(response.image));

    case DELETE_IMAGE_SUCCESS:
      if (!isMaterialImage()) return state;
      return state.set('image', null);

    default:
      return state;
  }
}

export default materialReducer;
