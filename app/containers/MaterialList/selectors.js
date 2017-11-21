import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('MaterialList');

export const selectMaterials = () =>
  createSelector(selectDomain(), (s) =>
    s.get('all').filter((p, key) => s.get('filtered').includes(key))
  );
