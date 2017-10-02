import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Annotations']);

export const selectExisting = () =>
  createSelector(selectDomain(), (s) => s.get('existing'));

export const selectNewAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('new'));

export const selectIsAnnotating = () =>
  createSelector(selectDomain(), (s) => s.get('isAnnotating'));

export const selectFocusedAnnotation = () =>
  createSelector(selectDomain(), (s) => {
    const a = s.getIn([
      'existing',
      idToIndex(s.get('focused'), s.get('existing')),
    ]);
    if (a) return a;
    return fromJS({});
  });
