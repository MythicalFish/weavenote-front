import { fromJS } from 'immutable';

const initialState = fromJS({});

function orgReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default orgReducer;
