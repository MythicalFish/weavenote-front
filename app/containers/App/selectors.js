import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('global');

// Stats

export const selectStats = () =>
  createSelector(selectDomain(), (s) => {
    const stats = s.get('stats');
    if (stats) {
      return stats.toJS();
    }
    return null;
  });

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
  createSelector(selectUser(), (s) => s.get('abilities').toJS());

// Invite

export const selectInvite = () =>
  createSelector(selectDomain(), (s) => s.get('invite'));

// Materials

export const selectMaterials = () =>
  createSelector(selectDomain(), (s) => s.get('materials'));

// Misc

export const selectCurrentSection = () =>
  createSelector(selectDomain(), (s) => s.get('currentSection').toJS());

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

export const selectModalID = () =>
  createSelector(selectDomain(), (s) => s.get('modalID'));

export const selectModalImage = () =>
  createSelector(selectDomain(), (s) => s.get('modalImage'));
