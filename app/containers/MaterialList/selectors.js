import { createSelector } from 'reselect';

const selectMaterials = () => (state) => state.get('MaterialList');

export { selectMaterials };
export default selectMaterials;
