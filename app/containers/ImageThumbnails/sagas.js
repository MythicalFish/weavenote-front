import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [watch];

const url = (payload) => {
  let image = payload.image;
  if (image.toJS) image = image.toJS();
  return `images/${image.id}`;
};

export function* watch() {
  const watcher = [yield takeLatest(types.DELETE_IMAGE, deleteImage)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* deleteImage({ payload }) {
  yield sagas.destroy(url(payload), payload, actions.deleteImageSuccess);
}
