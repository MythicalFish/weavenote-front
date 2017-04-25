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

