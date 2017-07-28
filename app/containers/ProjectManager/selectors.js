import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.getIn(['Project', 'Manager']);

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('project'));

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) =>
    substate.getIn(['project', 'material_cost'])
  );
