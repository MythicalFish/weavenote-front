import * as types from './constants';

// Material

export function fetchMaterial(id) {
  return { type: types.FETCH_MATERIAL, id };
}
export function fetchMaterialSuccess(material) {
  return { type: types.FETCH_MATERIAL_SUCCESS, material };
}
export function updateMaterial(material) {
  return { type: types.UPDATE_MATERIAL, material };
}
export function updateMaterialSuccess(material) {
  return { type: types.UPDATE_MATERIAL_SUCCESS, material };
}
export function createMaterial(material) {
  return { type: types.CREATE_MATERIAL, material };
}
export function createMaterialSuccess(materials) {
  return { type: types.CREATE_MATERIAL_SUCCESS, materials };
}

// Material types

export function fetchMaterialTypes() {
  return { type: types.FETCH_MATERIAL_TYPES };
}
export function fetchMaterialTypesSuccess(materialTypes) {
  return { type: types.FETCH_MATERIAL_TYPES_SUCCESS, materialTypes };
}

// Colors

export function fetchColors() {
  return { type: types.FETCH_COLORS };
}
export function fetchColorsSuccess(colors) {
  return { type: types.FETCH_COLORS_SUCCESS, colors };
}

// Currencies

export function fetchCurrencies() {
  return { type: types.FETCH_CURRENCIES };
}

export function fetchCurrenciesSuccess(currencies) {
  return { type: types.FETCH_CURRENCIES_SUCCESS, currencies };
}

// Care Labels

export function fetchCareLabels() {
  return { type: types.FETCH_CARE_LABELS };
}

export function fetchCareLabelsSuccess(care_labels) {
  return { type: types.FETCH_CARE_LABELS_SUCCESS, care_labels };
}

// Suppliers

export function fetchSuppliers() {
  return { type: types.FETCH_SUPPLIERS };
}

export function fetchSuppliersSuccess(suppliers) {
  return { type: types.FETCH_SUPPLIERS_SUCCESS, suppliers };
}

export function newSupplier() {
  return { type: types.NEW_SUPPLIER };
}

export function switchSupplier(supplier) {
  return { type: types.SWITCH_SUPPLIER, supplier };
}
