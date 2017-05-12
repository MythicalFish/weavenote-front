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
    const index = substate.get('currentComponent');
    const component = substate.getIn(['components', index]);
    if (component) { return component; }
    return null;
  }
);

export const selectImages = () => createSelector(
  selectDomain(),
  (substate) => substate.get('images')
);

export const selectCurrentImage = () => createSelector(
  selectDomain(),
  (substate) => {
    const index = substate.get('currentImage');
    const image = substate.getIn(['images', index]);
    if (image) { return image.toJS(); }
    return null;
  }
);
/*
 *
 *  Selectors for use with redux-form
 *
 */

export const selectBasicsForm = () => createSelector(
  selectProject(),
  (project) => {
    if (project) {
      return fromJS({
        id: project.id,
        name: project.name,
        category: project.category,
        identifier: project.identifier,
        development_stage_id: project.stage.id,
        description: project.description,
      });
    }
  }
);

export const selectComponentForm = () => createSelector(
  selectCurrentComponent(),
  (component) => {
    if (component) {
      return fromJS({
        id: component.get('id'),
        quantity: component.get('quantity'),
        project_id: component.get('project_id'),
      });
    }
  }
);
