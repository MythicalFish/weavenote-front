import { createSelector } from 'reselect';

export const selectNewAnnotation = () => (state) =>
  state.getIn(['Project', 'ImageAnnotation']);
