import * as types from './constants';

export function doFocus(id) {
  return { type: types.FOCUS, id };
}
