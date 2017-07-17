import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('attributes'));

export const selectCurrentImage = () =>
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

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) => substate.get('material_cost'));

export const selectComments = () =>
  createSelector(selectDomain(), (substate) => substate.get('comments'));

export const selectCurrentComment = () =>
  createSelector(selectDomain(), (s) => {
    const i = s.get('currentComment');
    return s.getIn(['comments', i]);
  });
