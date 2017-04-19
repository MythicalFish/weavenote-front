import { createSelector } from 'reselect';
import { selectGlobal } from '../App/selectors';

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
  selectGlobal,
  (substate) => {
    return substate.get('projects');
  }
);

export default makeSelectProjects;
export {
  selectProjectsDomain,
};
