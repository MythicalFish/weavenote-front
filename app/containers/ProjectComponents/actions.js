import * as types from './constants';

export function fetchComponents(project_id) {
  return { type: types.FETCH_COMPONENTS, payload: { project_id } };
}

export function fetchComponentsSuccess(response) {
  return { type: types.FETCH_COMPONENTS_SUCCESS, response };
}

export function updateComponent() {
  return { type: types.UPDATE_COMPONENT };
}

export function updateComponentSuccess(response) {
  return { type: types.UPDATE_COMPONENT_SUCCESS, response };
}

export function createComponent(payload) {
  return { type: types.CREATE_COMPONENT, payload };
}

export function createComponentSuccess(response) {
  return { type: types.CREATE_COMPONENT_SUCCESS, response };
}

export function deleteComponent({ projectID, id }) {
  return { type: types.DELETE_COMPONENT, projectID, id };
}

export function deleteComponentSuccess(response) {
  return { type: types.DELETE_COMPONENT_SUCCESS, response };
}
