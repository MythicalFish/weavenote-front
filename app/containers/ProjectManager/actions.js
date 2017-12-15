import * as types from './constants';

export function fetchProject(id) {
  return { type: types.FETCH_PROJECT, id };
}
export function fetchProjectSuccess(response) {
  return { type: types.FETCH_PROJECT_SUCCESS, response };
}

export function updateProject() {
  return { type: types.UPDATE_PROJECT };
}
export function updateProjectSuccess() {
  return { type: types.UPDATE_PROJECT_SUCCESS };
}

export function fetchMaterialCost() {
  return { type: types.FETCH_MATERIAL_COST };
}
export function fetchMaterialCostSuccess(response) {
  return { type: types.FETCH_MATERIAL_COST_SUCCESS, response };
}
