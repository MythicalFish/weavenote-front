import { createSelector } from 'reselect';

/**
 * Direct selector to the projects state domain
 */
const selectProjectsDomain = () => (state) => state.get('projects');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Projects
 */

const makeSelectProjects = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('items');
  }
);

export default makeSelectProjects;
export {
  selectProjectsDomain,
};
