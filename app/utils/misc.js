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

export const billingURL = () => {
  const domain =
    process.env.NODE_ENV === 'production'
      ? process.env.BILLING_URL_PROD
      : process.env.BILLING_URL_DEV;
  return `${domain}?access_token=${localStorage.access_token}`;
};

export function elementPosition(e) {
  const box = e.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}
