export function idToIndex(id, list) {
  return list.findKey((obj) => obj.get('id') === id);
}

export function forProject(action) {
  return forReducer('Project', action);
}

export function forInstruction(action) {
  return forReducer('Instruction', action);
}

export function forComment(action) {
  return forReducer('Comment', action);
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

export const filtered = (list, attributes, text = '') => {
  // Returns array of keys of a filtered list
  const f = [];
  const t = text.toLowerCase();
  list.forEach((item, key) => {
    const values = attributes.map((attr) => {
      if (Array.isArray(attr)) {
        return item.getIn(attr);
      }
      return item.get(attr);
    });
    values.forEach((value) => {
      // Return all keys if no text
      if (t.length === 0) f.push(key);
      // Skip if already found this item
      if (f.includes(key)) return;
      // Otherwise return key if matched
      if (value && value.toLowerCase().includes(t)) {
        f.push(key);
      }
    });
  });
  return f;
};
