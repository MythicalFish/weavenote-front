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

export const selectInstructions = () => createSelector(
  selectDomain(),
  (substate) => substate.get('instructions')
);

export const selectCurrentInstruction = () => createSelector(
  selectDomain(),
  (substate) => {
    const index = substate.get('currentInstruction');
    const instruction = substate.getIn(['instructions', index]);
    if (instruction) { return instruction; }
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

export const selectMeasurements = () => createSelector(
  selectDomain(),
  (substate) => substate.get('measurements')
);

/*
 *
 *  Selectors for use with redux-form
 *
 */

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
