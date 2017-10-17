import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('global');
export const selectMisc = () =>
  createSelector(selectDomain(), (s) => s.get('misc'));

// User

export const selectUser = () =>
  createSelector(selectDomain(), (s) => s.get('user'));

export const selectOrganization = () =>
  createSelector(selectUser(), (s) => s.get('organization'));

export const selectOrganizationRole = () =>
  createSelector(selectUser(), (s) => s.get('organization_role'));

export const selectOrganizations = () =>
  createSelector(selectUser(), (s) => s.get('organizations'));

export const selectAbilities = () =>
  createSelector(selectUser(), (s) => s.get('abilities'));

// Invite

export const selectInvite = () =>
  createSelector(selectMisc(), (s) => s.get('invite'));

// Misc

export const selectModalID = () =>
  createSelector(selectMisc(), (s) => s.get('modalID'));

export const selectModalImage = () =>
  createSelector(selectMisc(), (s) => s.get('modalImage'));

export const selectGlobalData = () =>
  createSelector(selectMisc(), (s) => s.get('globalData'));

// Route

export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
