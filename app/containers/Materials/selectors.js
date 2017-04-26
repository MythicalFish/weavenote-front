import { createSelector } from 'reselect';

/**
 * Direct selector to the materials state domain
 */
const selectMaterialsDomain = () => (state) => state.get('materials');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Materials
 */

const makeSelectMaterials = () => createSelector(
  selectMaterialsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMaterials;
export {
  selectMaterialsDomain,
};
