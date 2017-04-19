import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global'); /* same as (i think):

const selectGlobal = () => {
  return (state) => {
    state.get('global');
  };
};

*/

const makeSelectProjects = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('projects')
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
  makeSelectProjects,
  makeSelectLocationState,
};
