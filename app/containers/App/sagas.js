import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as actionType from './constants/actions';
import * as actions from './actions';

export default [appWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(actionType.FETCH_INVITE, fetchInvite),
    yield takeLatest(actionType.HANDLE_INVITE, handleInvite),
    yield takeLatest(actionType.HANDLE_INVITE_SUCCESS, handleInviteSuccess),
    yield takeLatest(actionType.SET_INVITE_KEY, setInviteKey),
    yield takeLatest(actionType.FETCH_USER, fetchUser),
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
