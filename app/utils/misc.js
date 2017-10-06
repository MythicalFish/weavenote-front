export function toggleState(component, attr) {
  const a = {};
  a[attr] = !component.state[attr];
  component.setState(a);
}

export function debounce(fn, delay, ...args) {
  let timer = null;
  return () => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
