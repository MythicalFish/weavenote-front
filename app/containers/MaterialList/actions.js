import * as types from './constants';

export function fetchMaterials() {
  return {
    type: types.FETCH_MATERIALS,
  };
}

export function fetchMaterialsSuccess(list) {
  return {
    type: types.FETCH_MATERIALS_SUCCESS,
    list,
  };
}

export function createMaterial() {
  return {
    type: types.CREATE_MATERIAL,
  };
}

export function createMaterialSuccess(list) {
  return {
    type: types.CREATE_MATERIAL_SUCCESS,
    list,
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