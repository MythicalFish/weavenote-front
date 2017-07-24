import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectImages');

export const selectAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('annotation'));
