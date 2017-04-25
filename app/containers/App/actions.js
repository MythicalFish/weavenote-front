import * as types from './constants';

export function getCurrentPageName(path) {
  return {
    type: types.GET_CURRENT_PAGE_NAME,
    path,
  };
}
