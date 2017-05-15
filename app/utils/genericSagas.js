// Generic, reusable sagas

import { call, put, select, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';

export function* fetchEntities(name, callback, params = null, selector = false) {
  let url;
  if (typeof name === 'object') {
    url = name.url;
  }
  try {
    let entities = null;
    if (selector) {
      entities = yield select(selector());
    }
    if (!entities) {
      entities = yield call(API.get, url || name, params);
    }
    yield put(callback(entities));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchEntity(name, id, callback) {
  try {
    const data = yield call(API.get, `${name}s/${id}`);
    yield put(callback(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* updateEntity(name, body, callback) {
  let params;
  let id;
  if (body[name]) {
    params = body;
    id = body[name].id;
  } else {
    params = { [name]: body };
    id = body.id;
  }
  try {
    const response = yield call(API.patch, `${name}s/${id}`, params);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createEntity(name, data, callback) {
  let url = `${name}s`;
  let rname = name;
  if (typeof name === 'object') {
    url = name.url;
    rname = name.name;
  }
  const params = { [rname]: data };
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