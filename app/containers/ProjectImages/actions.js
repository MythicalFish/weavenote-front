import * as types from './constants';

export function focusImage(payload) {
  return { type: types.FOCUS_IMAGE, payload };
}
