
import { fromJS } from 'immutable';
import conversationsReducer from '../reducer';

describe('conversationsReducer', () => {
  it('returns the initial state', () => {
    expect(conversationsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
