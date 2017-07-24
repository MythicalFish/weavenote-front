import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [watch];

export function* watch() {
  const watcher = [yield takeLatest(types.CREATE_IMAGE, createImage)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createImage({ payload }) {
  yield sagas.post('images', payload, actions.createImageSuccess);
}
