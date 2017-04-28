import { createSelector } from 'reselect';

/**
 * Direct selector to the test state domain
 */
const selectDashboardDomain = () => (state) => state.get('dashboard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Test
 */

const selectDashboard = () => createSelector(
  selectDashboardDomain(),
  (substate) => substate.toJS()
);

export default selectDashboard;
export {
  selectDashboardDomain,
};
