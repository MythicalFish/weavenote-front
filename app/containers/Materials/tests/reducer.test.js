
import { fromJS } from 'immutable';
import materialsReducer from '../reducer';

describe('materialsReducer', () => {
  it('returns the initial state', () => {
    expect(materialsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
