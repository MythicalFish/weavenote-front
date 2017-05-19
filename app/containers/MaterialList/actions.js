import * as types from './constants';

export function fetchMaterials() {
  return {
    type: types.FETCH_MATERIALS,
  };
}

export function fetchMaterialsSuccess(materials) {
  return {
    type: types.FETCH_MATERIALS_SUCCESS,
    materials,
  };
}

export function createMaterial() {
  return {
    type: types.CREATE_MATERIAL,
  };
}

export function createMaterialSuccess(materials) {
  return {
    type: types.CREATE_MATERIAL_SUCCESS,
    materials,
  };
}

export function fileMaterial(payload) {
  return {
    type: types.FILE_MATERIAL,
    payload,
  };
}

export function fileMaterialSuccess(list) {
  return {
    type: types.FILE_MATERIAL_SUCCESS,
    list,
  };
}