import { createSelector } from 'reselect';

const makeSelectGlobal = () => (state) => state.get('global');

const selectGlobal = () => createSelector(
  makeSelectGlobal(),
  (globalState) => globalState.toJS()
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
  makeSelectLocationState,
};
