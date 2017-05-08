import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as types from './constants';
import {
  fetchMaterialSuccess, updateMaterialSuccess,
  fetchMaterialTypesSuccess,
} from './actions';

export default [
  materialManagerWatcher,
];

export function* materialManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIAL, fetchMaterial),
    yield takeLatest(types.UPDATE_MATERIAL, updateMaterial),
    yield takeLatest(types.FETCH_MATERIAL_TYPES, fetchMaterialTypes),
  ];
  yield take(LOCATION_CHANGE);
  yield cancel(...watcher);
}

export function* fetchMaterialTypes() {
  try {
    const data = yield call(API.get, 'material_types');
    yield put(fetchMaterialTypesSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchMaterial(action) {
  try {
    const data = yield call(API.get, `materials/${action.id}`);
    yield put(fetchMaterialSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* updateMaterial(action) {
  const material = action.material.toJS();
  try {
    yield call(API.patch, `materials/${material.id}`, { material });
    yield put(updateMaterialSuccess());
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
