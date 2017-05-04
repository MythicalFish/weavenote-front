import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProjectManager = () => createSelector(
  selectDomain(),
  (substate) => substate.toJS()
);

export const selectCurrentImage = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('currentImage');
  }
);

export const selectProject = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('project');
  }
);

export const selectComponents = () => createSelector(
  selectDomain(),
  (substate) => substate.get('components')
);

/*
 *
 *  Selectors for use with redux-form
 *
 */

export const selectProjectBasics = () => createSelector(
  selectProject(),
  (substate) => {
    if (substate) {
      const project = substate.toJS();
      return fromJS({
        id: project.id,
        name: project.name,
        category: project.category,
        identifier: project.identifier,
        development_stage_id: project.stage.id,
      });
    }
    return substate;
  }
);
