import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [appWatcher];

const imageUrl = (payload) => `images/${payload.id}`;

export function* appWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_IMAGE, createImage),
    yield takeLatest(types.DELETE_IMAGE, deleteImage),
    yield takeLatest(types.UPDATE_IMAGE, updateImage),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createImage({ payload }) {
  yield sagas.post('images', payload, actions.createImageSuccess);
}

export function* deleteImage({ payload }) {
  yield sagas.destroy(imageUrl(payload), payload, actions.deleteImageSuccess);
}

export function* updateImage({ payload }) {
  yield sagas.patch(imageUrl(payload), payload, actions.updateImageSuccess);
}
