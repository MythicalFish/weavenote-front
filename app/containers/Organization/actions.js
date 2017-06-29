import * as types from './constants';

export function initializeOrganization() {
  return { type: types.INITIALIZE_ORGANIZATION };
}

export function updateOrg(org) {
  return { type: types.UPDATE_ORGANIZATION, org };
}
export function updateOrgSuccess(org) {
  return { type: types.UPDATE_ORGANIZATION_SUCCESS, org };
}
export function createOrg(organization) {
  return { type: types.CREATE_ORGANIZATION, organization };
}
export function createOrgSuccess(data) {
  return { type: types.CREATE_ORGANIZATION_SUCCESS, data };
}
