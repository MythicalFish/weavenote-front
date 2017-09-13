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

export const selectAvatarList = () =>
  createSelector(selectDomain(), (s) => s.get('avatarList'));

export const selectPDFexport = () =>
  createSelector(selectDomain(), (s) => s.get('PDFexport'));

export const selectUserRole = () =>
  createSelector(selectDomain(), (s) => s.get('userRole'));

export const selectAbilities = () =>
  createSelector(selectDomain(), (s) => s.get('abilities'));
