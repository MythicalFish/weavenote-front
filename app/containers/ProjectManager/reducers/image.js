import { reducer as formReducer } from 'redux-form/immutable';
import * as types from 'containers/ImageManager/constants';

export default formReducer.plugin({
  ImageForm: (state, action) => {
    switch (action.type) {
      case types.SWITCH_IMAGE:
        // return state.set('values', action.payload.values);
        return state;
      default:
        return state;
    }
  },
});
