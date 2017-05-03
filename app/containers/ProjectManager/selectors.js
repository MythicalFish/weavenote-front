import { createSelector } from 'reselect';
import { selectProjectsDomain } from '../ProjectsPage/selectors';

export const selectCurrentImage = () => createSelector(
  selectProjectsDomain(),
  (substate) => {
    return substate.get('currentImage');
  }
);
