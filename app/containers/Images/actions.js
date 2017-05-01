/*
 *
 * Images actions
 *
 */

import * as types from './constants';

export function selectImage(payload) {
  return {
    type: types.SELECT_IMAGE,
    payload,
  };
}
