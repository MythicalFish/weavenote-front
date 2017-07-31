export const selectMeasurements = () => (state) =>
  state.getIn(['Project', 'Measurements']);
