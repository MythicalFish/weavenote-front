import * as types from './constants';

export const sendInvite = (payload) => ({ type: types.SEND_INVITE, payload });
export const sendInviteSuccess = (invites) => ({ type: types.SEND_INVITE_SUCCESS, invites });

export const fetchInvites = (invitable) => ({ type: types.FETCH_INVITES, invitable });
export const fetchInvitesSuccess = (invites) => ({ type: types.FETCH_INVITES_SUCCESS, invites });

export const updateInvite = (payload) => ({ type: types.UPDATE_INVITE, payload });
export const updateInviteSuccess = () => ({ type: types.UPDATE_INVITE_SUCCESS });

export const cancelInvite = (payload) => ({ type: types.CANCEL_INVITE, payload });
export const cancelInviteSuccess = (invites) => ({ type: types.CANCEL_INVITE_SUCCESS, invites });

export const fetchRoleTypes = () => ({ type: types.FETCH_ROLE_TYPES });
export const fetchRoleTypesSuccess = (role_types) => ({ type: types.FETCH_ROLE_TYPES_SUCCESS, role_types });
