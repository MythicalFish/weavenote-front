import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import { UserWatcher } from 'containers/User/sagas';
import { fetchUser } from 'containers/User/actions';
import * as types from './constants';
import * as actions from './actions';
import { selectOrganization } from './selectors';
export default [appWatcher, UserWatcher];

export function* appWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_GLOBAL_DATA, fetchGlobalData),
    yield takeLatest(types.FETCH_INVITE, fetchInvite),
    yield takeLatest(types.HANDLE_INVITE, handleInvite),
    yield takeLatest(types.HANDLE_INVITE_SUCCESS, handleInviteSuccess),
    yield takeLatest(types.SET_INVITE_KEY, setInviteKey),
    yield takeLatest(types.SWITCH_ORGANIZATION, switchOrganization),
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

function* switchOrganization({ id }) {
  yield sagas.get(
    'switch_organization',
    { id },
    actions.switchOrganizationSuccess
  );
  window.location.reload();
}
