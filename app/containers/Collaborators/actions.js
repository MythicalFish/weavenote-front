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

// Collaborators

export const fetchCollaborators = (invitable) => ({ type: types.FETCH_COLLABORATORS, invitable });
export const fetchCollaboratorsSuccess = (collaborators) => ({ type: types.FETCH_COLLABORATORS_SUCCESS, collaborators });

export const updateCollaborator = (payload) => ({ type: types.UPDATE_COLLABORATOR, payload });
export const updateCollaboratorSuccess = (collaborators) => ({ type: types.UPDATE_COLLABORATOR_SUCCESS, collaborators });

export const removeCollaborator = (payload) => ({ type: types.REMOVE_COLLABORATOR, payload });
export const removeCollaboratorSuccess = (collaborators) => ({ type: types.REMOVE_COLLABORATOR_SUCCESS, collaborators });

// Other

export const fetchRoleTypes = () => ({ type: types.FETCH_ROLE_TYPES });
export const fetchRoleTypesSuccess = (role_types) => ({ type: types.FETCH_ROLE_TYPES_SUCCESS, role_types });
