export const selectInstructions = () => (state) =>
  state.getIn(['Project', 'Instructions']);
