// this file just selects projects, simple
// it's used by the main Projects logic (index.js) to get the current state

import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const selectProjects = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('projects')
);

export {
  selectProjects,
};
