import { createSelector } from 'reselect';

const selectProjectsDomain = () => (state) => state.get('projects');

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

export const selectCurrentProject = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('currentProject');
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

export const selectCurrentImage = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('currentImage');
  }
);