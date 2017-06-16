import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('global');

// Stats

export const selectStats = () => createSelector(
  selectDomain(), (s) => {
    const stats = s.get('stats');
    if (stats) { return stats.toJS(); }
    return null;
  }
);

// User

export const selectUser = () => createSelector(
  selectDomain(), (substate) => substate.get('user')
);

export const selectUserRole = () => createSelector(
  selectDomain(), (substate) => substate.get('user_role')
);

export const selectOrgs = () => createSelector(
  selectDomain(), (substate) => substate.get('organizations')
);

export const selectCurrentOrg = () => createSelector(
  selectDomain(), (substate) => substate.get('current_organization')
);

// Invite

export const selectInvite = () => createSelector(
  selectDomain(), (substate) => substate.get('invite')
);

// Materials

export const selectMaterials = () => createSelector(
  selectDomain(), (s) => s.get('materials')
);

// Misc

export const selectCurrentSection = () => createSelector(
  selectDomain(), (s) => s.get('currentSection').toJS()
);

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
