
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  invites: [],
  role_types: null,
});

function collaboratorsReducer(state = initialState, action) {

  switch (action.type) {

    case types.FETCH_INVITES_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    case types.CANCEL_INVITE_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    case types.SEND_INVITE_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    case types.FETCH_ROLE_TYPES_SUCCESS:
      return state
        .set('role_types', fromJS(action.role_types));

    default:
      return state;
  }
}

export default collaboratorsReducer;
