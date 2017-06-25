import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
export default [collaboratorsWatcher];

export function* collaboratorsWatcher() {
  const watcher = [
    yield takeLatest(types.SEND_INVITE, sendInvite),
    yield takeLatest(types.UPDATE_INVITE, updateInvite),
    yield takeLatest(types.CANCEL_INVITE, cancelInvite),
    yield takeLatest(types.FETCH_INVITES, fetchInvites),

  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* sendInvite({ payload }) {
  yield sagas.post('invites', payload, actions.sendInviteSuccess);
}

function* fetchInvites({ invitable }) {
  yield sagas.get('invites', { invitable }, actions.fetchInvitesSuccess);
}

function* updateInvite({ payload }) {
  yield sagas.patch(url(payload), payload, actions.updateInviteSuccess);
}

function* cancelInvite({ payload }) {
  yield sagas.destroy(url(payload), payload, actions.cancelInviteSuccess);
}

const url = (payload) => {
  return `invites/${payload.invite.get('key')}`;
}
