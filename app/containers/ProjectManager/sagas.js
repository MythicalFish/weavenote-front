import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { send } from 'utils/request';
import * as types from './constants/actions';
import {
  createImageSuccess,
} from './actions';

export default [
  createImageWatcher,
];

export function* createImage(action) {
  const { payload } = action;
  try {
    const image = yield call(send, { path: `projects/${payload.projectID}/create_image`, body: { url: payload.imageURL } });
    yield put(createImageSuccess(image));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createImageWatcher() {
  const watcher = yield takeLatest(types.CREATE_IMAGE, createImage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
