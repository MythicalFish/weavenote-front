import { createSelector } from 'reselect';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Measurements']);

export const selectMeasurements = () =>
  createSelector(selectDomain(), (s) => s.get('data'));
