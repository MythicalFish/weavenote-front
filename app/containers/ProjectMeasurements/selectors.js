import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectMeasurements');

export const selectMeasurements = () =>
  createSelector(selectDomain(), (substate) => substate.get('measurements'));
