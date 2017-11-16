import { createSelector } from 'reselect';

export const selectDomain = () => (state) => state.get('ProjectList');

export const selectProjects = () =>
  createSelector(selectDomain(), (s) =>
    s.get('all').filter((p, key) => !s.get('filtered').includes(key))
  );
