import * as types from './constants';

export function switchOrganization(id) {
  return { type: types.SWITCH_ORGANIZATION, id };
}
export function switchOrganizationSuccess(data) {
  return { type: types.SWITCH_ORGANIZATION_SUCCESS, data };
}
export function updateOrganization() {
  return { type: types.UPDATE_ORGANIZATION };
}
export function updateOrganizationSuccess(response) {
  return { type: types.UPDATE_ORGANIZATION_SUCCESS, response };
}
export function createOrganization(organization) {
  return { type: types.CREATE_ORGANIZATION, organization };
}
export function createOrganizationSuccess(data) {
  return { type: types.CREATE_ORGANIZATION_SUCCESS, data };
}
