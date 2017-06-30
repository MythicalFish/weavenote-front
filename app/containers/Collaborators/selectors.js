import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('collaborators');

export const selectRoles = () => createSelector(
  selectDomain(), (substate) => substate.get('roles'));

export const selectInvites = () => createSelector(
  selectDomain(), (substate) => substate.get('invites'));

export const selectRoleTypes = () => createSelector(
  selectDomain(), (substate) => substate.get('role_types'));
