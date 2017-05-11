import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as types from './constants';
import {
  fetchMaterialSuccess, updateMaterialSuccess, createMaterialSuccess,
  fetchMaterialTypesSuccess, fetchColorsSuccess,
} from './actions';

export default [
  materialManagerWatcher,
];

export function* materialManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIAL, fetchMaterial),
    yield takeLatest(types.UPDATE_MATERIAL, updateMaterial),
    yield takeLatest(types.CREATE_MATERIAL, createMaterial),
    yield takeLatest(types.FETCH_MATERIAL_TYPES, fetchMaterialTypes),
    yield takeLatest(types.FETCH_COLORS, fetchColors),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchMaterialTypes() {
  try {
    const data = yield call(API.get, 'material_types');
    yield put(fetchMaterialTypesSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* fetchColors() {
  try {
    const data = yield call(API.get, 'colors');
    yield put(fetchColorsSuccess(data));
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
  const material = sanitize(action.material.toJS());  
  try {
    yield call(API.patch, `materials/${material.id}`, { material });
    yield put(updateMaterialSuccess());
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* createMaterial(action) {
  const material = sanitize(action.material.toJS());  
  try {
    const response = yield call(API.post, 'materials', { material });
    yield put(createMaterialSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

function sanitize(material) {
  const attributes = material;
  if (attributes.type) {
    attributes.material_type_id = attributes.type.id;
    delete (attributes.type);
  }
  if (attributes.color) {
    attributes.color_id = attributes.color.id;
    delete (attributes.color);
  }
  return attributes;
}
