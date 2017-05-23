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

export const selectMaterialTypes = () => createSelector(
  selectDomain(), (substate) => {
    const types = substate.get('materialTypes');
    if (types) { return types.toJS(); }
    return types;
  }
);

export const selectColors = () => createSelector(
  selectDomain(), (substate) => {
    const colors = substate.get('colors');
    if (colors) { return colors.toJS(); }
    return colors;
  }
);

export const selectCurrencies = () => createSelector(
  selectDomain(), (substate) => {
    const currencies = substate.get('currencies');
    if (currencies) { return currencies.toJS(); }
    return currencies;
  }
);

export const selectSuppliers = () => createSelector(
  selectDomain(), (substate) => {
    const suppliers = substate.get('suppliers');
    if (suppliers) { return suppliers.toJS(); }
    return suppliers;
  }
);
