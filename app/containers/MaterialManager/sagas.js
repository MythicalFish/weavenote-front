import { delay } from 'redux-saga';
import { take, cancel, takeLatest, fork, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
export default [materialManagerWatcher];

export function* materialManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIAL, fetchMaterial),
    yield takeLatest(types.UPDATE_MATERIAL, updateMaterial),
    yield takeLatest(types.CREATE_MATERIAL, createMaterial),
    yield takeLatest(types.CREATE_MATERIAL_SUCCESS, showMaterial),
    yield takeLatest(types.FETCH_SUPPLIERS, fetchSuppliers),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchSuppliers() {
  yield sagas.get('suppliers', null, actions.fetchSuppliersSuccess);
}

export function* fetchMaterial(action) {
  yield sagas.get(`materials/${action.id}`, null, actions.fetchMaterialSuccess);
}

export function* updateMaterial(action) {
  const material = action.material.toJS();
  yield sagas.patch(
    `materials/${material.id}`,
    { material },
    actions.updateMaterialSuccess
  );
}

export function* createMaterial(action) {
  const material = action.material.toJS();
  yield sagas.post('materials', { material }, actions.createMaterialSuccess);
}

export function* showMaterial(action) {
  const material = action.material;
  browserHistory.push(`/materials/${material.id}`);
}
