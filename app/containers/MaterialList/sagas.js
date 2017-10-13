import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
export default [materialListWatcher];

export function* materialListWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIALS, fetchMaterials),
    yield takeLatest(types.DELETE_MATERIAL, deleteMaterial),
    yield takeLatest(types.DUPLICATE_MATERIAL, duplicateMaterial),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchMaterials() {
  yield sagas.get('materials', null, actions.fetchMaterialsSuccess);
}

export function* deleteMaterial({ id }) {
  yield sagas.destroy(`materials/${id}`, null, actions.deleteMaterialSuccess);
}

export function* duplicateMaterial({ id }) {
  yield sagas.post(`materials/${id}`, null, actions.duplicateMaterialSuccess);
}
