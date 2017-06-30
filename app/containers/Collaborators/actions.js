import * as types from './constants';

// Invites

export const sendInvite = (payload) => ({ type: types.SEND_INVITE, payload });
export const sendInviteSuccess = (invites) => ({ type: types.SEND_INVITE_SUCCESS, invites });

export const fetchInvites = (invitable) => ({ type: types.FETCH_INVITES, invitable });
export const fetchInvitesSuccess = (invites) => ({ type: types.FETCH_INVITES_SUCCESS, invites });

export const updateInvite = (payload) => ({ type: types.UPDATE_INVITE, payload });
export const updateInviteSuccess = (invites) => ({ type: types.UPDATE_INVITE_SUCCESS, invites });

export const cancelInvite = (payload) => ({ type: types.CANCEL_INVITE, payload });
export const cancelInviteSuccess = (invites) => ({ type: types.CANCEL_INVITE_SUCCESS, invites });

// roles

export const fetchRoles = (invitable) => ({ type: types.FETCH_ROLES, invitable });
export const fetchRolesSuccess = (roles) => ({ type: types.FETCH_ROLES_SUCCESS, roles });

export const updateRole = (payload) => ({ type: types.UPDATE_ROLE, payload });
export const updateRoleSuccess = (roles) => ({ type: types.UPDATE_ROLE_SUCCESS, roles });

export const removeRole = (payload) => ({ type: types.REMOVE_ROLE, payload });
export const removeRoleSuccess = (roles) => ({ type: types.REMOVE_ROLE_SUCCESS, roles });

// Other

export const fetchRoleTypes = () => ({ type: types.FETCH_ROLE_TYPES });
export const fetchRoleTypesSuccess = (role_types) => ({ type: types.FETCH_ROLE_TYPES_SUCCESS, role_types });
