import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('Comments');

export const selectData = () =>
  createSelector(selectDomain(), (s) => s.get('data'));

export const selectActions = () =>
  createSelector(selectDomain(), (s) => s.get('actions'));

export const isCreating = () =>
  createSelector(selectActions(), (s) => s.get('isCreating'));

export const isEditing = () =>
  createSelector(selectActions(), (s) => s.get('isEditing'));

export const isReplying = () =>
  createSelector(selectActions(), (s) => s.get('isReplying'));

export const selectCurrentComment = () =>
  createSelector(selectActions(), (s) => s.get('currentComment'));
