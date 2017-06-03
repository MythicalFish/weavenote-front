import * as types from './constants';

export function updateOrg(org) {
  return { type: types.UPDATE_ORG, org };
}
export function updateOrgSuccess(org) {
  return { type: types.UPDATE_ORG_SUCCESS, org };
}
export function createOrg(organization) {
  return { type: types.CREATE_ORG, organization };
}
export function createOrgSuccess(org) {
  return { type: types.CREATE_ORG_SUCCESS, org };
}
