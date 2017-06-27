import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('collaborators');

export const selectInvites = () => createSelector(
  selectDomain(), (substate) => substate.get('invites'));

export const selectCollaborators = () => createSelector(
  selectDomain(), (substate) => substate.get('collaborators'));

export const selectRoleTypes = () => createSelector(
  selectDomain(), (substate) => substate.get('role_types'));
