import { createSelector } from 'reselect';
export const selectDomain = () => (state) => state.get('ProjectInstructions');

export const selectInstructions = () =>
  createSelector(selectDomain(), (s) => s.get('instructions'));

export const selectCurrentInstruction = () =>
  createSelector(selectDomain(), (s) => {
    const index = s.get('currentInstruction');
    return s.getIn(['instructions', index]);
  });
