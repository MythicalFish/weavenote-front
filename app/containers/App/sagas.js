
import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants/actions';
import * as actions from './actions';

export default [appWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_USER, fetchUser),
    yield takeLatest(types.FETCH_USER_SUCCESS, createOrganization),
    yield takeLatest(types.FETCH_INVITE, fetchInvite),
    yield takeLatest(types.ACCEPT_INVITE, acceptInvite),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchUser() {
  yield sagas.get('user', null, actions.fetchUserSuccess);
}

function* createOrganization(action) {
  const { current_organization: current } = action.data;
  if (!current) {
    browserHistory.push('/organization');
  }
}

function* fetchInvite({ key }) {
  yield sagas.get(`invites/${key}`, null, actions.fetchInviteSuccess);
}

function* fetchInvite({ key }) {
  yield sagas.get(`invites/${key}`, null, actions.fetchInviteSuccess);
}

function* acceptInvite({ key }) {
  yield sagas.post(`accept_invite/${key}`, {}, actions.acceptInviteSuccess);
}
