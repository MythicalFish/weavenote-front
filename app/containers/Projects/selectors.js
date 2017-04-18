// this file just selects projects, simple
// it's used by the main Projects logic (index.js) to get the current state

import { createSelector } from 'reselect';

const selectProjectsDomain = (state) => state.get('projects');
const selectGlobal = (state) => state.get('global');

const makeSelectProjects = () => createSelector(
  selectProjectsDomain,
  (subState) => subState.getIn(['projects'])
);

export default {
  selectProjectsDomain,
  makeSelectProjects,
};
