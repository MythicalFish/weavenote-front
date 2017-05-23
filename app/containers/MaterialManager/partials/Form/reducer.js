import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import * as types from '../../constants';

export default formReducer.plugin({
  Material: (state, action) => {
    switch (action.type) {

      case types.UPDATE_MATERIAL_SUCCESS:
        return state
          .set('values', fromJS(action.material));

      case types.NEW_SUPPLIER:
        const s = state.getIn(['values', 'supplier']);
        const empty = {};
        s.mapKeys((key) => {
          empty[key] = null;
        });
        return state
          .setIn(['values', 'supplier'], fromJS(empty));

      default:
        return state;
    }
  },
});
