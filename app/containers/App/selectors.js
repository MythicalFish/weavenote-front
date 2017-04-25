import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global'); 

const selectLoading = () => createSelector(
  selectGlobal,
  (globalState) => { globalState.get('loading'); }
);

const selectError = () => createSelector(
  selectGlobal,
  (globalState) => { globalState.get('error'); }
);

const selectCurrentPage = () => createSelector(
  selectGlobal,
  (globalState) => { globalState.get('currentPage'); }
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
  selectLoading,
  selectError,
  selectCurrentPage,
  makeSelectLocationState,
};
