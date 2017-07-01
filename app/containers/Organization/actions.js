import * as types from './constants';

export function initializeOrganization() {
  return { type: types.INITIALIZE_ORGANIZATION };
}

export function updateOrganization(organization) {
  return { type: types.UPDATE_ORGANIZATION, organization };
}
export function updateOrganizationSuccess(organization) {
  return { type: types.UPDATE_ORGANIZATION_SUCCESS, organization };
}
export function createOrganization(organization) {
  return { type: types.CREATE_ORGANIZATION, organization };
}
export function createOrganizationSuccess(data) {
  return { type: types.CREATE_ORGANIZATION_SUCCESS, data };
}
