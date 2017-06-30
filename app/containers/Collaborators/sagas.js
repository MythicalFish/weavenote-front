import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import notificationsWatcher from './notifications';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
export default [notificationsWatcher, collaboratorsWatcher];

export function* collaboratorsWatcher() {
  const watcher = [

    yield takeLatest(types.SEND_INVITE, sendInvite),
    yield takeLatest(types.FETCH_INVITES, fetchInvites),
    yield takeLatest(types.UPDATE_INVITE, updateInvite),
    yield takeLatest(types.CANCEL_INVITE, cancelInvite),

    yield takeLatest(types.FETCH_ROLES, fetchRoles),
    yield takeLatest(types.UPDATE_ROLE, updateRole),
    yield takeLatest(types.REMOVE_ROLE, removeRole),

    yield takeLatest(types.FETCH_ROLE_TYPES, fetchRoleTypes),

  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// Invites

const inviteUrl = (payload) => (`invites/${payload.invite.get('key')}`);

function* sendInvite({ payload }) {
  yield sagas.post('invites', payload, actions.sendInviteSuccess);
}

function* fetchInvites({ invitable }) {
  yield sagas.get('invites', { invitable }, actions.fetchInvitesSuccess);
}

function* updateInvite({ payload }) {
  const update = { role_type_id: payload.roleType.get('id'), invitable: payload.invitable };
  yield sagas.patch(inviteUrl(payload), update, actions.updateInviteSuccess);
}

function* cancelInvite({ payload }) {
  yield sagas.destroy(inviteUrl(payload), payload, actions.cancelInviteSuccess);
}

// Roles

const roleURL = (payload) => (`roles/${payload.role.get('id')}`);

function* fetchRoles({ invitable }) {
  yield sagas.get('roles', { invitable }, actions.fetchRolesSuccess);
}

function* updateRole({ payload }) {
  const update = { role_type_id: payload.roleType.get('id'), invitable: payload.invitable };
  yield sagas.patch(roleURL(payload), update, actions.updateRoleSuccess);
}

function* removeRole({ payload }) {
  yield sagas.destroy(roleURL(payload), payload, actions.removeRoleSuccess);
}


// Other

function* fetchRoleTypes() {
  yield sagas.get('role_types', null, actions.fetchRoleTypesSuccess, selectors.selectRoleTypes);
}
