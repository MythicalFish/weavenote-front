import * as types from './constants';


export function sendInvite(payload) {
  return { type: types.SEND_INVITE, payload };
}

export function sendInviteSuccess(invites) {
  return { type: types.SEND_INVITE_SUCCESS, invites };
}

export function fetchInvites(invitable) {
  return { type: types.FETCH_INVITES, invitable };
}

export function fetchInvitesSuccess(invites) {
  return { type: types.FETCH_INVITES_SUCCESS, invites };
}

export function updateInvite(invite) {
  return { type: types.UPDATE_INVITE, invite };
}

export function updateInviteSuccess() {
  return { type: types.UPDATE_INVITE_SUCCESS };
}

export function cancelInvite(payload) {
  return { type: types.CANCEL_INVITE, payload };
}

export function cancelInviteSuccess(invites) {
  return { type: types.CANCEL_INVITE_SUCCESS, invites };
}
