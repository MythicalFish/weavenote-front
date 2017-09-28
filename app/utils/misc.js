export function toggleState(component, attr) {
  const a = {};
  a[attr] = !component.state[attr];
  component.setState(a);
}
