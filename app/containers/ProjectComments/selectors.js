import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.getIn(['Project', 'Comments']);

export const selectComments = () =>
  createSelector(selectDomain(), (substate) => substate.get('comments'));
