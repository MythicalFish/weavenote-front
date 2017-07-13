import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectDomain = () => (state) => state.get('ProjectComponents');

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
