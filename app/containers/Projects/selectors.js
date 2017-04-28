import { createSelector } from 'reselect';

const selectProjectsDomain = () => (state) => state.get('projects');

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
  selectProjectsDomain(),
  (substate) => {
    return substate.get('currentSection');
  }
);

export const selectCurrentSectionID = () => createSelector(
  selectCurrentSection(),
  (substate) => {
    return substate.id;
  }
);

