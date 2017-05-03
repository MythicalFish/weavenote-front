import { createSelector } from 'reselect';

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

export const selectCurrentProject = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('currentProject');
  }
);

export const makeSelectCurrentView = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('currentView');
  }
);

export const selectCurrentSection = () => createSelector(
  selectProjectManager(),
  (substate) => {
    return substate.currentSection;
  }
);
