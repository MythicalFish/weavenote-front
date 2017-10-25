import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.getIn(['Project', 'Export']);

export const selectOptions = () =>
  createSelector(selectDomain(), (substate) => substate.get('options'));

export const selectState = () =>
  createSelector(selectDomain(), (substate) => substate.get('state'));

export const selectURL = () =>
  createSelector(selectDomain(), (substate) => substate.get('url'));
