// Generic, reusable sagas

import { call, put, select, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';
import { notify, notifyError, notifyWarning } from 'containers/Notification';
import { logout } from './authUtils';

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
    yield handleError(e);
  }
}

export function* patch(url, params, callback) {
  try {
    const response = yield call(API.patch, url, params);
    yield handleResponse(callback, response);
  } catch (e) {
    yield handleError(e);
  }
}

export function* post(url, params, callback) {
  try {
    const response = yield call(API.post, url, params);
    yield handleResponse(callback, response);
  } catch (e) {
    yield handleError(e);
  }
}

export function* destroy(url, params, callback) {
  try {
    const response = yield call(API.destroy, url, params);
    yield handleResponse(callback, response);
  } catch (e) {
    yield handleError(e);
  }
}

function* handleError({ error }) {
  const { message } = error;
  if (error.type === 'warning') {
    yield put(notifyWarning(message));
  } else if (error.type === 'bug') {
    yield put(notifyError(message));
  } else if (process.env.NODE_ENV === 'production') {
    logout();
    setTimeout(() => {
      window.location.replace('/');
    }, 100);
  } else {
    yield put(notifyError(message));
  }
}

function* handleResponse(callback, response) {
  if (response) {
    if (response.message) {
      // yield put(notify(response.message));
    }
    let payload;
    if (response.payload) {
      payload = response.payload;
    } else {
      payload = response;
    }
    yield put(callback(payload));
  } else {
    yield put(notifyWarning('No response was given by the API'));
  }
}
