import { fromJS } from 'immutable';
import * as types from './constants';
import * as orgTypes from 'containers/Organization/constants';

const initialState = fromJS({
  organization: null,
  role: null,
  organizations: null,
  abilities: null,
});

function UserReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    //
    case types.FETCH_USER_SUCCESS:
      return fromJS(action.data);

    case types.UPDATE_USER_SUCCESS:
      return state.set('name', action.response.name);

    // Org

    case orgTypes.SWITCH_ORGANIZATION_SUCCESS:
      return fromJS(action.data);

    case orgTypes.CREATE_ORGANIZATION_SUCCESS:
      return fromJS(action.data);

    case orgTypes.UPDATE_ORGANIZATION_SUCCESS:
      return state.set('organization', fromJS(action.response));

    default:
      return state;
  }
}

export default UserReducer;
