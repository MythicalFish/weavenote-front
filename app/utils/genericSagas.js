// Generic, reusable sagas

import { call, put, select, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';
import { notify, notifyError } from 'containers/Notification';

export function* get(url, params, callback, selector = false) {
  try {
    let response = null;
    if (selector) {
      response = yield select(selector());
    }
    if (!response) {
      response = yield call(API.get, url, params);
    }
    if (response.message) {
      yield put(notify(response.message));
    }
    if (response.payload) {
      response = response.payload;
    }
    yield put(callback(response));
  } catch (error) {
    yield put(notifyError(error.message));
  }
}

export function* patch(url, params, callback) {
  try {
    const response = yield call(API.patch, url, params);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* post(url, params, callback) {
  try {
    const response = yield call(API.post, url, params);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* destroy(url, params, callback) {
  try {
    const response = yield call(API.destroy, url, params);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
