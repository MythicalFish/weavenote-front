
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  invites: [],
  collaborators: [],
  role_types: null,
});

function collaboratorsReducer(state = initialState, action) {

  switch (action.type) {

    // Invites

    case types.SEND_INVITE_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    case types.FETCH_INVITES_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    case types.CANCEL_INVITE_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    case types.UPDATE_INVITE_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));

    // Collaborators

    case types.FETCH_COLLABORATORS_SUCCESS:
      return state
        .set('collaborators', fromJS(action.collaborators));

    case types.REMOVE_COLLABORATOR_SUCCESS:
      return state
        .set('collaborators', fromJS(action.collaborators));

    case types.UPDATE_COLLABORATOR_SUCCESS:
      return state
        .set('collaborators', fromJS(action.collaborators));

    // Other

    case types.FETCH_ROLE_TYPES_SUCCESS:
      return state
        .set('role_types', fromJS(action.role_types));

    default:
      return state;
  }
}

export default collaboratorsReducer;
