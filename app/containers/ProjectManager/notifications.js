import { put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { notify } from 'containers/Notification';
import * as types from './constants';

export default function* notificationWatcher() {
  const watcher = [
    yield takeLatest(types.UPDATE_PROJECT_SUCCESS, notifySuccess),
    yield takeLatest(types.UPDATE_COMPONENT_SUCCESS, notifySuccess),
    yield takeLatest(types.UPDATE_MEASUREMENTS_SUCCESS, notifySuccess),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* notifySuccess() {
  yield put(notify('Successfully updated'));
}
