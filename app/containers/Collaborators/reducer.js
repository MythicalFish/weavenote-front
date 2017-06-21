
import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  invites: [],
});

function collaboratorsReducer(state = initialState, action) {

  switch (action.type) {

    case types.FETCH_INVITES_SUCCESS:
      return state
        .set('invites', fromJS(action.invites));
      
    default:
      return state;
  }
}

export default collaboratorsReducer;
