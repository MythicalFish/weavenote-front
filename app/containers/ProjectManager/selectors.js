import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.getIn(['Project', 'Manager']);

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('project'));

export const selectProjectID = () =>
  createSelector(selectProject(), (s) => s.get('id'));

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) =>
    substate.getIn(['project', 'material_cost'])
  );

export const selectCollaborators = () =>
  createSelector(selectDomain(), (s) => s.get('collaborators'));

export const selectUserRole = () =>
  createSelector(selectDomain(), (s) => s.get('userRole'));

export const selectAbilities = () =>
  createSelector(selectDomain(), (s) => s.get('abilities'));
