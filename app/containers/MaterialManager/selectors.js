import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('MaterialManager');

export const selectMaterial = () => createSelector(
  selectDomain(), (substate) => substate.get('material')
);

export const selectMaterialTypes = () => createSelector(
  selectDomain(), (substate) => substate.get('materialTypes')
);

export const selectColors = () => createSelector(
  selectDomain(), (substate) => substate.get('colors')
);

export const selectCurrencies = () => createSelector(
  selectDomain(), (substate) => substate.get('currencies')
);

export const selectSuppliers = () => createSelector(
  selectDomain(), (substate) => substate.get('suppliers')
);

export const selectCareLabels = () => createSelector(
  selectDomain(), (substate) => substate.get('care_labels')
);
