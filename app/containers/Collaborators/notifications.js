import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { notify } from 'containers/Notification';
import * as types from './constants';

export default function* notificationsWatcher() {
  const watcher = [
    yield takeLatest(types.UPDATE_ROLE_SUCCESS, notifySuccess),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* notifySuccess() {
  yield put(notify('Successfully updated collaborator'));
}
