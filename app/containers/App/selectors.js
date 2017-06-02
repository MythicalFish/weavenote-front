import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('global');

// Stats

const selectStats = () => createSelector(
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

export const selectOrganizations = () => createSelector(
  selectDomain(), (substate) => substate.get('organizations')
);

export const selectCurrentOrganization = () => createSelector(
  selectDomain(), (substate) => substate.get('current_organization')
);

// Materials

const selectMaterials = () => createSelector(
  selectDomain(), (s) => s.get('materials')
);

// Misc

export const selectCurrentSection = () => createSelector(
  selectDomain(), (s) => s.get('currentSection').toJS()
);

const makeSelectLocationState = () => {
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

export {
  selectDomain,
  selectStats,
  selectMaterials,
  makeSelectLocationState,
};
