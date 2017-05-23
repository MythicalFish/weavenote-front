import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import * as types from '../../constants';

export default formReducer.plugin({
  Material: (state, action) => {
    switch (action.type) {

      case types.NEW_SUPPLIER:
        const s = state.getIn(['values', 'supplier']);
        const empty = {};
        s.mapKeys((key) => {
          empty[key] = null;
        });
        return state
          .setIn(['values', 'supplier'], fromJS(empty));
        // return state
        //   .setIn(['values', 'supplier', 'name'], null);

      default:
        return state;
    }
  },
});
