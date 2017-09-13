import * as types from './constants';

export function fetchMaterials() {
  return {
    type: types.FETCH_MATERIALS,
  };
}

export function fetchMaterialsSuccess(response) {
  return {
    type: types.FETCH_MATERIALS_SUCCESS,
    response,
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

export function deleteMaterial(id) {
  return { type: types.DELETE_MATERIAL, id };
}

export function deleteMaterialSuccess(response) {
  return { type: types.DELETE_MATERIAL_SUCCESS, response };
}
