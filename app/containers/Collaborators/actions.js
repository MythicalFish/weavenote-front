import * as types from './constants';


export function sendInvite(invite) {
  return { type: types.SEND_INVITE, invite };
}

export function sendInviteSuccess() {
  return { type: types.SEND_INVITE_SUCCESS };
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

export function cancelInvite(invite) {
  return { type: types.CANCEL_INVITE, invite };
}

export function cancelInviteSuccess() {
  return { type: types.CANCEL_INVITE_SUCCESS };
}
