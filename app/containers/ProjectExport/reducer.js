import { fromJS } from 'immutable';
import * as types from './constants';
const initialState = fromJS({
  url: null,
  state: {
    finished: false,
    inProgress: false,
  },
  options: {
    basics: true,
    measurements: true,
    instructions: true,
    materials: true,
    comments: true,
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
      return state.setIn(['state', 'inProgress'], true).set('url', null);

    case types.EXPORT_PDF_SUCCESS:
      return initialState
        .setIn(['state', 'finished'], true)
        .set('url', response.url);

    case types.RESET_EXPORT_PDF:
      return initialState;

    default:
      return state;
  }
}

export default reducer;
