import { createSelector } from 'reselect';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'ImageAnnotation']);

export const selectNewAnnotation = () =>
  createSelector(selectDomain(), (substate) => substate.get('new'));

export const selectIsAnnotating = () =>
  createSelector(selectNewAnnotation(), (substate) =>
    substate.get('isAnnotating')
  );

export const selectFocusedAnnotation = () =>
  createSelector(selectDomain(), (substate) => substate.get('focus'));
