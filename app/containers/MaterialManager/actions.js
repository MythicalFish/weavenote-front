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
export function updateMaterialSuccess() {
  return { type: types.UPDATE_MATERIAL_SUCCESS };
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
