import { take, cancel, takeLatest, select, put } from 'redux-saga/effects';
import { getFormValues, isDirty, initialize } from 'redux-form/immutable';
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
    yield takeLatest(types.UPDATE_MATERIAL_SUCCESS, resetForm),
    yield takeLatest(types.CREATE_MATERIAL, createMaterial),
    yield takeLatest(types.CREATE_MATERIAL_SUCCESS, showMaterial),
    yield takeLatest(types.FETCH_SUPPLIERS, fetchSuppliers),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchSuppliers() {
  yield sagas.get('suppliers', null, actions.fetchSuppliersSuccess);
}

function* fetchMaterial(action) {
  yield sagas.get(`materials/${action.id}`, null, actions.fetchMaterialSuccess);
}

function* updateMaterial() {
  const dirty = yield select(isDirty('Material'));
  if (!dirty) return;
  const material = yield select(getFormValues('Material'));
  yield sagas.patch(
    `materials/${material.get('id')}`,
    { material },
    actions.updateMaterialSuccess
  );
}

function* resetForm() {
  const material = yield select(selectors.selectMaterial());
  yield put(initialize('Material', material));
}

function* createMaterial() {
  const material = yield select(getFormValues('Material'));
  yield sagas.post('materials', { material }, actions.createMaterialSuccess);
}

function* showMaterial() {
  browserHistory.push('/materials');
}
