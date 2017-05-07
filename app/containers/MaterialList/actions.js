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
