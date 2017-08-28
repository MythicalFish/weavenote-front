import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  invites: [],
  roles: [],
});

function collaboratorsReducer(state = initialState, action) {
  switch (action.type) {
    // Invites

    case types.SEND_INVITE_SUCCESS:
      return state.set('invites', fromJS(action.invites));

    case types.FETCH_INVITES_SUCCESS:
      return state.set('invites', fromJS(action.invites));

    case types.CANCEL_INVITE_SUCCESS:
      return state.set('invites', fromJS(action.invites));

    case types.UPDATE_INVITE_SUCCESS:
      return state.set('invites', fromJS(action.invites));

    // Roles

    case types.FETCH_ROLES_SUCCESS:
      return state.set('roles', fromJS(action.roles));

    case types.REMOVE_ROLE_SUCCESS:
      return state.set('roles', fromJS(action.roles));

    case types.UPDATE_ROLE_SUCCESS:
      return state.set('roles', fromJS(action.roles));

    default:
      return state;
  }
}

export default collaboratorsReducer;
