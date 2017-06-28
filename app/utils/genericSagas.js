// Generic, reusable sagas

import { call, put, select, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';
import { notify, notifyError, notifyWarning } from 'containers/Notification';

export function* get(url, params, callback, selector = false) {
  try {
    let response = null;
    if (selector) {
      response = yield select(selector());
    }
    if (!response) {
      response = yield call(API.get, url, params);
    }
    yield handleResponse(callback, response);
  } catch (e) {
    yield put(notifyError(e.error.message));
  }
}

export function* patch(url, params, callback) {
  try {
    const response = yield call(API.patch, url, params);
    yield handleResponse(callback, response);
  } catch (e) {
    yield put(notifyError(e.error.message));
  }
}

export function* post(url, params, callback) {
  try {
    const response = yield call(API.post, url, params);
    yield handleResponse(callback, response);
  } catch (e) {
    yield put(notifyError(e.error.message));
  }
}

export function* destroy(url, params, callback) {
  try {
    const response = yield call(API.destroy, url, params);
    yield handleResponse(callback, response);
  } catch (e) {
    yield put(notifyError(e.error.message));
  }
}

function* handleResponse(callback, response) {
  if (response.message) {
    yield put(notify(response.message));
  }
  if (response.warning) {
    yield put(notifyWarning(response.warning));
  }
  let payload;
  if (response.payload) {
    payload = response.payload;
  } else {
    payload = response;
  }
  yield put(callback(payload));
}

