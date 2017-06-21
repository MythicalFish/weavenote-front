import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('collaborators');

export const selectInvites = () => createSelector(
  selectDomain(), (substate) => substate.get('invites'));
