import * as types from './constants';

// Global data

export function fetchGlobalData() {
  return { type: types.FETCH_GLOBAL_DATA };
}

export function fetchGlobalDataSuccess(response) {
  return { type: types.FETCH_GLOBAL_DATA_SUCCESS, response };
}

// Invite

export function setInviteKey(key) {
  return { type: types.SET_INVITE_KEY, key };
}

export function fetchInvite(key) {
  return { type: types.FETCH_INVITE, key };
}

export function fetchInviteSuccess(invite) {
  return { type: types.FETCH_INVITE_SUCCESS, invite };
}

export function handleInvite(key) {
  return { type: types.HANDLE_INVITE, key };
}

export function handleInviteSuccess() {
  return { type: types.HANDLE_INVITE_SUCCESS };
}

// Org switching

export function switchOrganization(id) {
  return { type: types.SWITCH_ORGANIZATION, id };
}
export function switchOrganizationSuccess(data) {
  return { type: types.SWITCH_ORGANIZATION_SUCCESS, data };
}

// Currency switching

export function switchCurrency(currency) {
  return { type: types.SWITCH_CURRENCY, currency };
}

// Other

export function openModal(id) {
  return { type: types.OPEN_MODAL, id };
}

export function closeModal() {
  return { type: types.CLOSE_MODAL };
}

export function openImage(image) {
  return { type: types.OPEN_IMAGE, image };
}
