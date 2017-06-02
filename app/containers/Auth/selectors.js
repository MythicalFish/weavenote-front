import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('auth');

export const selectUser = () => createSelector(
  selectDomain(), (substate) => substate.get('user')
);
