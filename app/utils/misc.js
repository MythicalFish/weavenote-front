export function toggleState(component, attr) {
  const a = {};
  a[attr] = !component.state[attr];
  component.setState(a);
}

export function debounce(fn, delay, context, ...args) {
  return () => {
    clearTimeout(context.timer);
    context.timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
