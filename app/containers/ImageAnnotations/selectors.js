import { createSelector } from 'reselect';

export const selectNewAnnotation = () => (state) =>
  state.getIn(['Project', 'ImageAnnotation']);

export const selectIsAnnotating = () =>
  createSelector(selectNewAnnotation(), (substate) =>
    substate.get('isAnnotating')
  );
