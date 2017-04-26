import { createSelector } from 'reselect';

const selectProjectsDomain = () => (state) => state.get('projects');

export const makeSelectList = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('list');
  }
);

export const makeSelectActive = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('active');
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

