
import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as types from './constants';
import { fetchMaterialsSuccess } from './actions';

export default [
  materialListWatcher,
];

export function* materialListWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIALS, fetchMaterials),
  ];
  yield take(LOCATION_CHANGE);
  yield cancel(...watcher);
}

export function* fetchMaterials(action) {
  const { params } = action;
  try {
    const materials = yield call(API.get, 'materials', params);
    yield put(fetchMaterialsSuccess(materials));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
