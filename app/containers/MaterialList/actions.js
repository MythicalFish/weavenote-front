import * as types from './constants';

export function fetchMaterials() {
  return {
    type: types.FETCH_MATERIALS,
  };
}

export function fetchMaterialsSuccess() {
  return {
    type: types.FETCH_MATERIALS_SUCCESS,
  };
}