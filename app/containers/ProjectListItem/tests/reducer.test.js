
import { fromJS } from 'immutable';
import projectListItemReducer from '../reducer';

describe('projectListItemReducer', () => {
  it('returns the initial state', () => {
    expect(projectListItemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
