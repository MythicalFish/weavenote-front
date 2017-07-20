import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('project'));

export const selectCurrentImage = () =>
  createSelector(selectDomain(), (s) => s.getIn(['project', 'images', s.get('currentImage')]));

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) =>
    substate.getIn(['project', 'material_cost'])
  );

export const selectComments = () =>
  createSelector(selectDomain(), (substate) =>
    substate.getIn(['project', 'comments'])
  );
