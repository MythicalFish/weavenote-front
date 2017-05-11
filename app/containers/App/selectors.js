import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectStats = () => createSelector(
  selectGlobal(), (s) => {
    const stats = s.get('stats');
    if (stats) { return stats.toJS(); }
    return null;
  }
);

const selectMaterials = () => createSelector(
  selectGlobal(), (s) => s.get('materials')
);

export const selectCurrentSection = () => createSelector(
  selectGlobal(), (s) => s.get('currentSection').toJS()
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
  selectGlobal,
  selectStats,
  selectMaterials,
  makeSelectLocationState,
};
