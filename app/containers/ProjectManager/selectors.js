import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProject = () => createSelector(
  selectDomain(),
  (substate) => {
    const project = substate.get('project');
    if (project) {
      return project.toJS();
    }
    return project;
  }
);

export const selectComponents = () => createSelector(
  selectDomain(),
  (substate) => substate.get('components')
);

export const selectCurrentComponent = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('currentComponent');
  }
);

export const selectImages = () => createSelector(
  selectDomain(),
  (substate) => substate.get('images')
);

export const selectCurrentImage = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('currentImage');
  }
);
/*
 *
 *  Selectors for use with redux-form
 *
 */

export const selectProjectBasics = () => createSelector(
  selectProject(),
  (project) => {
    if (project) {
      return fromJS({
        id: project.id,
        name: project.name,
        category: project.category,
        identifier: project.identifier,
        development_stage_id: project.stage.id,
      });
    }
  }
);
