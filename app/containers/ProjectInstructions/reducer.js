import { fromJS } from 'immutable';
import { reducer as fReducer } from 'redux-form/immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import { idToIndex } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS([]);

function reducer(state = initialState, action) {
  const { response } = action;

  const isInstructionImage = () => response.imageable.type === 'Instruction';

  const setImages = () => {
    const { id } = response.imageable;
    if (!id) {
      // No ID means new Instruction, so set
      // the Image ID in the form reducer.
      return state;
    }
    const index = idToIndex(id, state);
    return state.setIn([index, 'images'], fromJS(response.images));
  };

  switch (action.type) {
    case types.FETCH_INSTRUCTIONS_SUCCESS:
      return fromJS(response);

    case types.UPDATE_INSTRUCTION_SUCCESS:
      return fromJS(response);

    case types.CREATE_INSTRUCTION_SUCCESS:
      return fromJS(response);

    case types.DELETE_INSTRUCTION_SUCCESS:
      return fromJS(response);

    case CREATE_IMAGE_SUCCESS:
      if (!isInstructionImage()) return state;
      return setImages();

    case DELETE_IMAGE_SUCCESS:
      if (!isInstructionImage()) return state;
      return setImages();

    default:
      return state;
  }
}

export default reducer;

const formReducer = fReducer.plugin({
  Instructions: (state, { type, response }) => {
    const images = () => state.getIn(['values', 'image_ids']);
    switch (type) {
      case CREATE_IMAGE_SUCCESS:
        if (response.imageable.id) return state;
        return state.setIn(
          ['values', 'image_ids', images().size],
          response.images[0].id
        );
      default:
        return state;
    }
  },
});

export { formReducer };
