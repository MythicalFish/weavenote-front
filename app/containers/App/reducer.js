import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import UserReducer from 'containers/User/reducer';
import * as appActionTypes from './constants';

const initialState = fromJS({
  globalData: null,
  invite: null,
  modalID: null,
  modalImage: null,
  focus: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // Global data

    case appActionTypes.FETCH_GLOBAL_DATA_SUCCESS:
      return state.set('globalData', fromJS(action.response).toObject());

    // Invite

    case appActionTypes.FETCH_INVITE_SUCCESS:
      return state.set('invite', action.invite);

    // Misc

    case appActionTypes.OPEN_MODAL:
      return state.set('modalID', action.id);

    case appActionTypes.CLOSE_MODAL:
      return state.set('modalID', null);

    case appActionTypes.OPEN_IMAGE:
      return state.set('modalID', 'image').set('modalImage', action.image);

    default:
      return state;
  }
}

export default combineReducers({
  user: UserReducer,
  misc: appReducer,
});
