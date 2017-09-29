import { createSelector } from 'reselect';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Annotations']);

export const selectExisting = () =>
  createSelector(selectDomain(), (s) => s.get('existing'));

export const selectNewAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('new'));

export const selectIsAnnotating = () =>
  createSelector(selectDomain(), (s) => s.get('isAnnotating'));

export const selectFocusedAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('focused'));
