import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectImages');

export const selectNewAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('newAnnotation'));

export const selectImages = () =>
  createSelector(selectDomain(), (s) => s.get('images'));
