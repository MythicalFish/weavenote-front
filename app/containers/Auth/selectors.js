import { createSelector } from 'reselect';

const selectDomain = () => (state) => state.get('auth');

