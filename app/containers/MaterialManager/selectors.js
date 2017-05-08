import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('MaterialManager');

export const selectMaterialManager = () => createSelector(
  selectDomain(), (substate) => substate.toJS()
);

export const selectMaterial = () => createSelector(
  selectDomain(), (substate) => {
    const material = substate.get('material');
    if (material) { return material.toJS(); }
    return material;
  }
);

