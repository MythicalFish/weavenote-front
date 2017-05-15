import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
export default [materialManagerWatcher];

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
  yield sagas.get('material_types', actions.fetchMaterialTypesSuccess);
}

export function* fetchColors() {
  yield sagas.get('colors', actions.fetchColorsSuccess);
}

export function* fetchMaterial(action) {
  yield sagas.get(`materials/${action.id}`, actions.fetchMaterialSuccess);
}

export function* updateMaterial(action) {
  const material = sanitize(action.material.toJS());
  yield sagas.patch(`materials/${material.id}`, { material }, actions.updateMaterialSuccess);
}

export function* createMaterial(action) {
  yield sagas.post('materials', { material: sanitize(action.material.toJS()) }, actions.createMaterialSuccess);
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
