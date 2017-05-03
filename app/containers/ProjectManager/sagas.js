import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { send, request } from 'utils/request';
import * as types from './constants/actions';
import {
  createImageSuccess, fetchProjectSuccess,
} from './actions';

export default [
  createImageWatcher,
  fetchProjectWatcher,
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

export function* fetchProject(action) {
  try {
    const data = yield call(request, { path: `projects/${action.id}` });
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchProjectWatcher() {
  const watcher = yield takeLatest(types.SHOW_PROJECT, fetchProject);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}