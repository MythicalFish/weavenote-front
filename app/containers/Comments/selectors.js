import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('Comments');

export const selectData = () =>
  createSelector(selectDomain(), (s) => s.get('data'));

export const isCreating = () =>
  createSelector(selectDomain(), (s) => s.get('isCreating'));

export const isEditing = () =>
  createSelector(selectDomain(), (s) => s.get('isEditing'));

export const isReplying = () =>
  createSelector(selectDomain(), (s) => s.get('isReplying'));

export const selectCurrentComment = () =>
  createSelector(selectDomain(), (s) => s.get('currentComment'));
