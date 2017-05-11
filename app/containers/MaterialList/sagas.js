
import { call, put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { selectMaterials } from 'containers/App/selectors';
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
  yield watcher.map((task) => cancel(task));
}

export function* fetchMaterials({ params }) {
  try {
    let materials = yield select(selectMaterials());
    if (!materials) {
      materials = yield call(API.get, 'materials', params);
    }
    yield put(fetchMaterialsSuccess(materials));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
