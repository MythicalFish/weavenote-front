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

export function envVar(v) {
  if (process.env.NODE_ENV === 'production') {
    switch (v) {
      case 'billing':
        return `${process.env.BILLING_PROD}?access_token=${
          localStorage.access_token
        }`;
      default:
        return null;
    }
  } else {
    switch (v) {
      case 'billing':
        return `${process.env.BILLING_DEV}?access_token=${
          localStorage.access_token
        }`;
      default:
        return null;
    }
  }
}
