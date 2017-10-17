import * as types from './constants';

// Material

export function fetchMaterial(id) {
  return { type: types.FETCH_MATERIAL, id };
}
export function fetchMaterialSuccess(response) {
  return { type: types.FETCH_MATERIAL_SUCCESS, response };
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
