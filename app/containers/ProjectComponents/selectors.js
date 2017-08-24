import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const selectDomain = () => (state) =>
  state.getIn(['Project', 'Components']);

export const selectComponents = () =>
  createSelector(selectDomain(), (substate) => substate.get('components'));
