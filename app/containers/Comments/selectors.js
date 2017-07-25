import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('Comments');

export const isCreating = () =>
  createSelector(selectDomain(), (s) => s.get('isCreating'));

export const isEditing = () =>
  createSelector(selectDomain(), (s) => s.get('isEditing'));

export const isReplying = () =>
  createSelector(selectDomain(), (s) => s.get('isReplying'));

export const currentComment = () =>
  createSelector(selectDomain(), (s) => s.get('currentComment'));

export const commentAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('annotation'));
