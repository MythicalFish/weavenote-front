export const selectMaterial = () => (state) => state.get('Material');

export const selectAbilities = () => (state) =>
  state.getIn(['global', 'user', 'abilities', 'Material']).toJS();
