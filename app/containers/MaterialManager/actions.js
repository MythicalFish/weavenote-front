import * as types from './constants';

export function fetchMaterial(id) {
  return { type: types.FETCH_MATERIAL, id };
}
export function fetchMaterialSuccess(material) {
  return { type: types.FETCH_MATERIAL_SUCCESS, material };
}
export function updateMaterial(material) {
  return { type: types.UPDATE_MATERIAL, material };
}
export function updateMaterialSuccess() {
  return { type: types.UPDATE_MATERIAL_SUCCESS };
}
