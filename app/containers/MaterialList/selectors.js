import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('MaterialList');

const selectMaterials = () => createSelector(
  selectDomain(),
  (substate) => substate.toJS()
);

export default selectMaterials;
export {
  selectDomain,
};
