// Generic, reusable sagas

import { call, put, select, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';

export function* fetchEntities(url, callback, params = null, selector = false) {
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

export function* fetchEntity(url, callback) {
  try {
    const response = yield call(API.get, url);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* updateEntity(url, params, callback) {
  try {
    const response = yield call(API.patch, url, params);
    if (Array.isArray(callback)) {
      yield put(callback[0](response));
      yield put(callback[1](response));
    } else {
      yield put(callback(response));
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createEntity(url, params, callback) {
  try {
    const response = yield call(API.post, url, params);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* deleteEntity(url, callback) {
  try {
    const response = yield call(API.destroy, url);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
