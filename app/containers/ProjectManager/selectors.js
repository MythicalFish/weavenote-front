import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectDomain = () => (state) => state.get('ProjectManager');

export const selectProject = () =>
  createSelector(selectDomain(), (s) => s.get('attributes'));

export const selectMaterialCost = () =>
  createSelector(selectDomain(), (substate) => substate.get('material_cost'));

export const selectComponents = () =>
  createSelector(selectDomain(), (substate) => substate.get('components'));

export const selectCurrentComponent = () =>
  createSelector(selectDomain(), (substate) => {
    const index = substate.get('currentComponent');
    const component = substate.getIn(['components', index]);
    if (component) {
      return component;
    }
    return null;
  });

export const selectInstructions = () =>
  createSelector(selectDomain(), (substate) => substate.get('instructions'));

export const selectCurrentInstruction = () =>
  createSelector(selectDomain(), (substate) => {
    const index = substate.get('currentInstruction');
    const instruction = substate.getIn(['instructions', index]);
    if (instruction) {
      return instruction;
    }
    return null;
  });

export const selectProjectCurrentImage = () =>
  createSelector(selectDomain(), (s) => s.getIn(['attributes', 'images', s.get('currentImage')]));

export const selectMeasurements = () =>
  createSelector(selectDomain(), (substate) => substate.get('measurements'));

/*
 *
 *  Selectors for use with redux-form
 *
 */

export const selectComponentForm = () =>
  createSelector(selectCurrentComponent(), (component) => {
    if (component) {
      return fromJS({
        id: component.get('id'),
        quantity: component.get('quantity'),
        project_id: component.get('project_id'),
      });
    }
  });
