import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('ImageUploader');

export const selectIsUploading = () =>
  createSelector(selectDomain(), (s) => s.get('isUploading'));
