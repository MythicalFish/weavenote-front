import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('project'));

export const selectCurrentImage = () =>
  createSelector(selectDomain(), (s) => {
    const i = s.getIn(['project', 'images', s.get('currentImage')]);
    const imageable = {
      type: 'Project',
      id: s.getIn(['project', 'id']),
    };
    if (i) {
      return i.set('imageable', imageable).toJS();
    } else {
      return { imageable };
    }
  });

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) =>
    substate.getIn(['project', 'material_cost'])
  );

export const selectComments = () =>
  createSelector(selectDomain(), (substate) =>
    substate.getIn(['project', 'comments'])
  );

export const selectCreatingComment = () =>
  createSelector(selectDomain(), (s) => s.get('creatingComment'));

export const selectCurrentComment = () =>
  createSelector(selectDomain(), (s) => {
    const i = s.get('currentComment');
    return s.getIn(['project', 'comments', i]);
  });
