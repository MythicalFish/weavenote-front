import * as types from './constants';

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
