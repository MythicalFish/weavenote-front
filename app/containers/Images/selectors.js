import { createSelector } from 'reselect';
import { selectCurrentProject } from 'containers/Projects/selectors';

const selectImages = () => createSelector(
  selectCurrentProject(),
  (substate) => substate.images,
);

export {
  selectImages,
};
