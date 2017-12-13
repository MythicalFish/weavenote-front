import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import UserReducer from 'containers/User/reducer';
import * as types from './constants';

const initialState = fromJS({
  globalData: null,
  invite: null,
  modalID: null,
  modalImage: null,
  focus: null,
  preferred_currency: 1,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // Global data

    case types.FETCH_GLOBAL_DATA_SUCCESS:
      return state.set('globalData', fromJS(action.response).toObject());

    // Invite

    case types.FETCH_INVITE_SUCCESS:
      return state.set('invite', action.invite);

    case types.SWITCH_CURRENCY:
      return state.set('preferred_currency', action.currency.get('id'));

    // Misc

    case types.OPEN_MODAL:
      return state.set('modalID', action.id);

    case types.CLOSE_MODAL:
      return state.set('modalID', null);

    case types.OPEN_IMAGE:
      return state.set('modalID', 'image').set('modalImage', action.image);

    default:
      return state;
  }
}

export default combineReducers({
  user: UserReducer,
  misc: appReducer,
});
