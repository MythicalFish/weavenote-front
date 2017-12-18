import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [materialListWatcher];

function* materialListWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIALS, fetchMaterials),
    yield takeLatest(types.DELETE_MATERIAL, deleteMaterial),
    yield takeLatest(types.FILE_MATERIAL, fileMaterial),
    yield takeLatest(types.DUPLICATE_MATERIAL, duplicateMaterial),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchMaterials({ params }) {
  yield sagas.get('materials', params, actions.fetchMaterialsSuccess);
}

function* deleteMaterial({ id }) {
  yield sagas.destroy(`materials/${id}`, null, actions.deleteMaterialSuccess);
}

function* duplicateMaterial({ id }) {
  yield sagas.post(`materials/${id}`, null, actions.duplicateMaterialSuccess);
}

function* fileMaterial(action) {
  const { id, archived } = action.payload;
  yield sagas.patch(
    `materials/${id}/categorize`,
    { archived },
    actions.fileMaterialSuccess
  );
}
