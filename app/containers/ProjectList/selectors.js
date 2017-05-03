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