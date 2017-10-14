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
    return response;
  } catch (e) {
    yield handleError(e);
    return e;
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
  } else if (error.type === 'auth') {
    doLogout();
  } else {
    // Don't know what's happening, so logout
    if (process.env.production) {
      doLogout();
    }
  }
}

function* handleResponse(callback, response) {
  if (response) {
    if (response.message) {
      yield put(notify(response.message));
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

const doLogout = () => {
  logout();
  setTimeout(() => {
    window.location.replace('/');
  }, 100);
};
