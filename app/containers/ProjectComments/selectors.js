export const selectComments = () => (state) =>
  state.getIn(['Project', 'Comments']);
