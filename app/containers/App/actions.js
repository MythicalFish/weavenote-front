import * as types from './constants/actions';

// Users

export function fetchUser() {
  return {
    type: types.FETCH_USER,
  };
}

export function fetchUserSuccess(data) {
  return {
    type: types.FETCH_USER_SUCCESS,
    data,
  };
}


// Stats

export function fetchStats() {
  return {
    type: types.FETCH_STATS,
  };
}

export function fetchStatsSuccess(stats) {
  return {
    type: types.FETCH_STATS_SUCCESS,
    stats,
  };
}

// UI actions

export function changeSection(section) {
  return {
    type: types.CHANGE_SECTION,
    section,
  };
}

export function showModal({ modalComponent, modalProps }) {
  return {
    type: types.SHOW_MODAL,
    modalComponent,
    modalProps,
  };
}

export function hideModal() {
  return {
    type: types.HIDE_MODAL,
  };
}
