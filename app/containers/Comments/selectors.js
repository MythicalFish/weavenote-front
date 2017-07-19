import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('Comments');

export const isCreating = () =>
  createSelector(selectDomain(), (s) => s.get('isCreating'));

export const isUpdating = () =>
  createSelector(selectDomain(), (s) => s.get('isUpdating'));

export const isReplying = () =>
  createSelector(selectDomain(), (s) => s.get('isReplying'));

export const currentComment = () =>
  createSelector(selectDomain(), (s) => s.get('currentComment'));
