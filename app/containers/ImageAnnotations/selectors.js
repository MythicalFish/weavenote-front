import { createSelector } from 'reselect';

export const selectNewAnnotation = () => (state) =>
  state.getIn(['Project', 'ImageAnnotation']);

export const selectIsAnnotating = () =>
  createSelector(selectNewAnnotation(), (s) => s.get('isAnnotating'));
