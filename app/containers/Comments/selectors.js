import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('Comments');

export const selectIsCreating = () =>
  createSelector(selectDomain(), (s) => s.get('isCreating'));

export const selectIsUpdating = () =>
  createSelector(selectDomain(), (s) => s.get('isUpdating'));
