import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('ImageManager');

export const selectCurrentImage = () =>
  createSelector(selectDomain(), (s) => s.get('currentImage'));
