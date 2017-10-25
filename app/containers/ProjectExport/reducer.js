import { fromJS } from 'immutable';
import * as types from './constants';
const initialState = fromJS({
  finished: false,
  inProgress: false,
  url: null,
  options: {
    comments: false,
  },
});

function reducer(state = initialState, action) {
  const { response, payload } = action;

  switch (action.type) {
    case types.CONFIGURE_EXPORT_PDF:
      return state.set(
        'options',
        fromJS(Object.assign(state.get('options').toJS(), payload))
      );

    case types.EXPORT_PDF:
      return state.set('inProgress', true).set('url', null);

    case types.EXPORT_PDF_SUCCESS:
      return initialState.set('finished', true).set('url', response.url);

    default:
      return state;
  }
}

export default reducer;
