import { createSelector } from 'reselect';

export const selectProjectsDomain = () => (state) => state.get('ProjectList');

export const selectProjects = () => createSelector(
  selectProjectsDomain(),
  (substate) => substate.toJS()
);

export const selectProjectsList = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('list');
  }
);

export const makeSelectCurrentView = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('currentView');
  }
);

export const selectCurrentSection = () => createSelector(
  selectProjects(),
  (substate) => {
    return substate.currentSection;
  }
);
