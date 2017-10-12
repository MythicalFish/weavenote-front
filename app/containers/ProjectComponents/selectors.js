import { createSelector } from 'reselect';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Components']);

export const selectComponents = () =>
  createSelector(selectDomain(), (substate) => substate.get('components'));

export const selectSelectedMaterials = () =>
  createSelector(selectDomain(), (substate) => substate.get('selectedMaterials'));
