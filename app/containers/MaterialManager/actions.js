import * as types from './constants';

// Material

export function fetchMaterial(id) {
  return { type: types.FETCH_MATERIAL, id };
}
export function fetchMaterialSuccess(material) {
  return { type: types.FETCH_MATERIAL_SUCCESS, material };
}
export function updateMaterial() {
  return { type: types.UPDATE_MATERIAL };
}
export function updateMaterialSuccess(response) {
  return { type: types.UPDATE_MATERIAL_SUCCESS, response };
}
export function createMaterial() {
  return { type: types.CREATE_MATERIAL };
}
export function createMaterialSuccess(response) {
  return { type: types.CREATE_MATERIAL_SUCCESS, response };
}

// Care labels

export function addCareLabel(label) {
  return { type: types.ADD_CARE_LABEL, label };
}

export function removeCareLabel(payload) {
  return { type: types.REMOVE_CARE_LABEL, payload };
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
