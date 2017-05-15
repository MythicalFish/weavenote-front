
import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { selectMaterials } from 'containers/App/selectors';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
export default [materialListWatcher];

export function* materialListWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_MATERIALS, fetchMaterials),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchMaterials() {
  yield sagas.fetchEntities('materials', actions.fetchMaterialsSuccess, null, selectMaterials);
}
