import { put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { notify } from 'containers/Notification';
import * as types from './constants';

export default function* notificationWatcher() {
  const watcher = [
    yield takeLatest(types.SEND_INVITE_SUCCESS, sendSuccess),
    yield takeLatest(types.CANCEL_INVITE_SUCCESS, cancelSuccess),
    yield takeLatest(types.UPDATE_INVITE_SUCCESS, updateSuccess),

  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* sendSuccess() {
  yield put(notify('Invitation sent'));
}

function* cancelSuccess() {
  yield put(notify('Invitation cancelled'));
}

function* updateSuccess() {
  yield put(notify('Invitation updated'));
}
