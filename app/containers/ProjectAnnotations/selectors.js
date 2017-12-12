import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Annotations']);

export const existing = () =>
  createSelector(selectDomain(), (s) => s.get('existing'));

export const newAnnotation = () =>
  createSelector(selectDomain(), (s) => s.get('new'));

export const isAnnotating = () =>
  createSelector(selectDomain(), (s) => s.get('isAnnotating'));

export const isEditingLabel = () =>
  createSelector(selectDomain(), (s) => s.get('isEditingLabel'));

export const focusedAnnotation = () =>
  createSelector(selectDomain(), (s) => {
    const a = s.getIn([
      'existing',
      idToIndex(s.get('focused'), s.get('existing')),
    ]);
    if (a) return a;
    return fromJS({});
  });
