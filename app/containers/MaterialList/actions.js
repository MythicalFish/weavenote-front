import * as types from './constants';

export function fetchMaterials(params) {
  return {
    type: types.FETCH_MATERIALS,
    params,
  };
}

export function fetchMaterialsSuccess(response) {
  return {
    type: types.FETCH_MATERIALS_SUCCESS,
    response,
  };
}

export function fileMaterial(payload) {
  return { type: types.FILE_MATERIAL, payload };
}

export function fileMaterialSuccess(response) {
  return { type: types.FILE_MATERIAL_SUCCESS, response };
}

export function deleteMaterial(id) {
  return { type: types.DELETE_MATERIAL, id };
}

export function deleteMaterialSuccess(response) {
  return { type: types.DELETE_MATERIAL_SUCCESS, response };
}

export function duplicateMaterial(id) {
  return { type: types.DUPLICATE_MATERIAL, id };
}

export function duplicateMaterialSuccess(response) {
  return { type: types.DUPLICATE_MATERIAL_SUCCESS, response };
}

export function filterMaterials(text) {
  return { type: types.FILTER_MATERIALS, text };
}
