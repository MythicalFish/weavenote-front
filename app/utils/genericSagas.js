// Generic, reusable sagas

import { call, put, cancel } from 'redux-saga/effects';
import * as API from 'utils/API';

export function* fetchEntities(name, callback, params = null) {
  try {
    const data = yield call(API.get, name, params);
    yield put(callback(data));
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

export function* updateEntity(name, data, callback) {
  const params = { [name]: data };
  try {
    yield call(API.patch, `${name}s/${data.id}`, params);
    yield put(callback());
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createEntity(name, data, callback) {
  const params = { [name]: data };
  try {
    const response = yield call(API.post, `${name}s`, params);
    yield put(callback(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}