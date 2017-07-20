import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('ImageManager');

export const selectModalImage = () =>
  createSelector(selectDomain(), (s) => s.get('modalImage'));
