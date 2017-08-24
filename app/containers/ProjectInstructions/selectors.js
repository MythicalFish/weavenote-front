import { createSelector } from 'reselect';
export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Instructions']);

export const selectInstructions = () =>
  createSelector(selectDomain(), (s) => s.get('instructions'));
