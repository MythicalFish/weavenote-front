import { createSelector } from 'reselect';

const selectFocused = () => (state) => state.get('Focus');

export { selectFocused };
