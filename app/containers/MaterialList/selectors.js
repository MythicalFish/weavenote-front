import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('MaterialList');

const selectMaterials = () => createSelector(
  selectDomain(), (substate) => substate.toJS()
);

export const selectMaterialsList = () => createSelector(
  selectDomain(),
  (substate) => {
    return substate.get('list');
  }
);

export default selectMaterials;
export {
  selectDomain,
};
