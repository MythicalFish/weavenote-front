import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('MaterialList');

export const selectMaterialList = () => createSelector(
  selectDomain(),
  (substate) => substate.toJS()
);

export default selectMaterialList;
export {
  selectDomain,
};
