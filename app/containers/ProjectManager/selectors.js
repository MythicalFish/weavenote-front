import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('attributes'));

export const selectProjectCurrentImage = () =>
  createSelector(selectDomain(), (s) => {
    const i = s.getIn(['attributes', 'images', s.get('currentImage')]);
    const imageable = {
      type: 'Project',
      id: s.getIn(['attributes', 'id']),
    };
    if (i) {
      return i.set('imageable', imageable).toJS();
    } else {
      return { imageable };
    }
  });

export const selectMeasurements = () =>
  createSelector(selectDomain(), (substate) => substate.get('measurements'));

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) => substate.get('material_cost'));
