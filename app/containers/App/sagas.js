
import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants/actions';
import * as actions from './actions';

export default [appWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_INVITE, fetchInvite),
    yield takeLatest(types.HANDLE_INVITE, handleInvite),
    yield takeLatest(types.HANDLE_INVITE_SUCCESS, handleInviteSuccess),
    yield takeLatest(types.SET_INVITE_KEY, setInviteKey),
    yield takeLatest(types.FETCH_USER, fetchUser),
    yield takeLatest(types.INITIALIZE_ORGANIZATION, initializeOrganization),

  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchUser() {
  yield sagas.get('user', null, actions.fetchUserSuccess);
}

function* setInviteKey({ key }) {
  localStorage.setItem('inviteKey', key);
  browserHistory.push('/');
}

function* initializeOrganization() {
  if (location.pathname !== '/organization') {
    browserHistory.push('/organization');
  }
}

function* handleInvite({ key }) {
  yield sagas.post(`accept_invite/${key}`, null, actions.handleInviteSuccess);
}

function* handleInviteSuccess() {
  localStorage.removeItem('inviteKey');
  yield put(actions.fetchUser());
}

function* fetchInvite({ key }) {
  yield sagas.get(`invites/${key}`, null, actions.fetchInviteSuccess);
}
