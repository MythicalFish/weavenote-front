import { put, take, cancel, takeLatest } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
export default [collaboratorsWatcher];

export function* collaboratorsWatcher() {
  const watcher = [
    yield takeLatest(types.SEND_INVITE, sendInvite),
    yield takeLatest(types.FETCH_INVITES, fetchInvites),
    yield takeLatest(types.UPDATE_INVITE, updateInvite),
    yield takeLatest(types.CANCEL_INVITE, cancelInvite),

    yield takeLatest(types.FETCH_ROLES, fetchRoles),
    yield takeLatest(types.UPDATE_ROLE, updateRole),
    yield takeLatest(types.REMOVE_ROLE, removeRole),

    // yield takeLatest(types.SEND_INVITE_SUCCESS, resetForm),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// Invites

const inviteUrl = (payload) => `invites/${payload.invite.get('key')}`;

function* sendInvite({ payload }) {
  yield sagas.post('invites', payload, actions.sendInviteSuccess);
}

function* fetchInvites({ invitable }) {
  yield sagas.get('invites', { invitable }, actions.fetchInvitesSuccess);
}

function* updateInvite({ payload }) {
  const invite = {
    role_type_id: payload.roleType.get('id'),
  };
  const { invitable } = payload;
  yield sagas.patch(
    inviteUrl(payload),
    { invite, invitable },
    actions.updateInviteSuccess
  );
}

function* cancelInvite({ payload }) {
  yield sagas.destroy(inviteUrl(payload), payload, actions.cancelInviteSuccess);
}

function* resetForm() {
  yield put(initialize('InviteForm', null, { form: 'InviteForm' }));
}

// Roles

const roleURL = (payload) => `roles/${payload.role.get('id')}`;

function* fetchRoles({ invitable }) {
  yield sagas.get('roles', { invitable }, actions.fetchRolesSuccess);
}

function* updateRole({ payload }) {
  const role = {
    role_type_id: payload.roleType.get('id'),
  };
  const invitable = payload.invitable;
  yield sagas.patch(
    roleURL(payload),
    { role, invitable },
    actions.updateRoleSuccess
  );
}

function* removeRole({ payload }) {
  yield sagas.destroy(roleURL(payload), payload, actions.removeRoleSuccess);
}
