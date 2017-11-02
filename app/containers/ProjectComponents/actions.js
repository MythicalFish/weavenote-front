import * as types from './constants';

export function fetchComponents() {
  return { type: types.FETCH_COMPONENTS };
}

export function fetchComponentsSuccess(response) {
  return { type: types.FETCH_COMPONENTS_SUCCESS, response };
}

export function updateComponent(component) {
  return { type: types.UPDATE_COMPONENT, component };
}

export function updateComponentSuccess(response) {
  return { type: types.UPDATE_COMPONENT_SUCCESS, response };
}

export function createComponents() {
  return { type: types.CREATE_COMPONENTS };
}

export function createComponentsSuccess(response) {
  return { type: types.CREATE_COMPONENTS_SUCCESS, response };
}

export function deleteComponent(payload) {
  return { type: types.DELETE_COMPONENT, payload };
}

export function deleteComponentSuccess(response) {
  return { type: types.DELETE_COMPONENT_SUCCESS, response };
}

export function selectMaterial(payload) {
  return { type: types.SELECT_MATERIAL, payload };
}
