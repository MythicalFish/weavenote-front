import * as types from './constants';

export function initializeOrganization() {
  return { type: types.INITIALIZE_ORGANIZATION };
}
export function switchOrganization(id) {
  return { type: types.SWITCH_ORGANIZATION, id };
}
export function switchOrganizationSuccess(data) {
  return { type: types.SWITCH_ORGANIZATION_SUCCESS, data };
}
export function updateOrganization(organization) {
  return { type: types.UPDATE_ORGANIZATION, organization };
}
export function updateOrganizationSuccess(data) {
  return { type: types.UPDATE_ORGANIZATION_SUCCESS, data };
}
export function createOrganization(organization) {
  return { type: types.CREATE_ORGANIZATION, organization };
}
export function createOrganizationSuccess(data) {
  return { type: types.CREATE_ORGANIZATION_SUCCESS, data };
}
