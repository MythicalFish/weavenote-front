import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.getIn(['Project', 'Images']);

export const selectImages = () =>
  createSelector(selectDomain(), (s) => s.get('imageList'));

export const selectCurrentImage = () =>
  createSelector(selectDomain(), (s) =>
    s.getIn(['imageList', s.get('currentImage')])
  );
