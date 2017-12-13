import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('Project');

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('Manager'));

export const selectProjectID = () =>
  createSelector(selectProject(), (s) => s.get('id'));

export const selectMaterialCost = () =>
  createSelector(selectProject(), (s) => s.get('material_cost'));

export const selectCollaborators = () =>
  createSelector(selectProject(), (s) => s.get('all_collaborators'));

export const selectRole = () =>
  createSelector(selectDomain(), (s) => s.getIn(['user', 'role_type']));

export const selectAbilities = () =>
  createSelector(selectDomain(), (s) => s.getIn(['user', 'abilities']));
