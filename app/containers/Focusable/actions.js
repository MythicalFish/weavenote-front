import * as types from './constants';

export function setFocus(payload) {
  return { type: types.FOCUS, payload };
}
