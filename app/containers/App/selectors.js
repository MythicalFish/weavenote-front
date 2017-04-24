import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global'); /*

// same as:

const selectGlobal = (state) => {
  return state.get('global');
};

*/

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('loading');
  }
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('error');
  }
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
  makeSelectLoading,
  makeSelectError,
  makeSelectLocationState,
};
