import { createSelector } from 'reselect';

const selectProjectsDomain = () => (state) => state.get('projects');

const makeSelectProjects = () => createSelector(
  selectProjectsDomain(),
  (substate) => substate.get('projects')
);

export default {
  makeSelectProjects,
};
