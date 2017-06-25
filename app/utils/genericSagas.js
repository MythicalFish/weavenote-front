// Generic, reusable sagas

import { call, put, select, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';

export function* get(url, params, callback, selector = false) {
  try {
    let entities = null;
    if (selector) {
      entities = yield select(selector());
    }
    if (!entities) {
      entities = yield call(API.get, url, params);
    }
    yield put(callback(entities));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
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
