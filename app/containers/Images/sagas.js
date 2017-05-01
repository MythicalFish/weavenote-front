import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { send } from 'utils/request';
import * as types from './constants';

import {
  selectImageSuccess,
} from './actions';

export function* createImage(action) {
  const { payload } = action;
  const path = `projects/${payload.projectID}/add_image`;
  const body = { url: payload.imageURL };
  try {
    const images = yield call(send, { path, body });
    yield put(createImageSuccess(images));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createImageWatcher() {
  const watcher = yield takeLatest(types.CREATE_IMAGE, createImage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
