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

export function* sendInvite({ params }) {
  yield sagas.post('invites', params, actions.sendInviteSuccess);
}

export function* fetchInvites({ invitable }) {
  yield sagas.get('invites', { invitable_type, invitable_id }, actions.fetchInvitesSuccess);
}

export function* updateInvite({ invitable, invite }) {
  yield sagas.patch(`invites/${invite.get('key')}`, { invite, invitable }, actions.updateInviteSuccess);
}

export function* cancelInvite({ invitable, invite }) {
  yield sagas.destroy(`invites/${invite.get('key')}`, invitable, actions.cancelInviteSuccess);
}
