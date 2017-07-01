import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('user');

// Profile

export const selectProfile = () => createSelector(
  selectDomain(), (substate) => substate.get('user'));
