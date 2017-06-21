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


export function* sendInvite({ invite }) {
  yield sagas.post('create_invite', invite, actions.sendInviteSuccess);
}

export function* fetchInvites({ project_id }) {
  yield sagas.get('invites', actions.fetchInvitesSuccess, { project_id });
}

export function* updateInvite({ invite }) {
  yield sagas.patch('invite', invite, actions.updateInviteSuccess);
}

export function* cancelInvite({ invite }) {
  yield sagas.destroy('invite', invite, actions.cancelInviteSuccess);
}
