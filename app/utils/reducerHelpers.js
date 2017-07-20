export function forProject(action) {
  return forReducer('Project', action);
}

export function forInstruction(action) {
  return forReducer('Instruction', action);
}

const forReducer = (reducer, action) => {
  const { response, payload } = action;
  if (!response && !payload) return true;
  if (response) {
    if (!response.reducer) return true;
    return response.reducer === reducer;
  } else if (payload) {
    if (!payload.reducer) return true;
    return payload.reducer === reducer;
  }
  return true;
};
