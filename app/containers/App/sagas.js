import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import { UserWatcher } from 'containers/User/sagas';
import { fetchUser } from 'containers/User/actions';
import * as actionType from './constants';
import * as actions from './actions';
export default [appWatcher, UserWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(actionType.FETCH_GLOBAL_DATA, fetchGlobalData),
    yield takeLatest(actionType.FETCH_INVITE, fetchInvite),
    yield takeLatest(actionType.HANDLE_INVITE, handleInvite),
    yield takeLatest(actionType.HANDLE_INVITE_SUCCESS, handleInviteSuccess),
    yield takeLatest(actionType.SET_INVITE_KEY, setInviteKey),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchGlobalData() {
  yield sagas.get('global_data', null, actions.fetchGlobalDataSuccess);
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
  yield put(fetchUser());
}

function* fetchInvite({ key }) {
  yield sagas.get(`invites/${key}`, null, actions.fetchInviteSuccess);
}
