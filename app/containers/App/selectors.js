import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
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


const selectGlobal = () => {
  return (state) => {
    state.get('global');
  };
};

// above is same as:
// const selectGlobal = () => (state) => state.get('global');

const selectProjects = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('projects')
);


export {
  makeSelectLocationState,
  selectGlobal,
  selectProjects,
};


export default selectGlobal;
