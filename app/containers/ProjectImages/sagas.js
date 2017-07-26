import {
  call,
  put,
  take,
  cancel,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import { selectAnnotation } from './selectors';
import * as types from './constants';
import * as actions from './actions';

export default [watch];

function* watch() {
  const watcher = [yield takeLatest(types.CREATE_ANNOTATION, createAnnotation)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createAnnotation({ image }) {
  const annotation = yield select(selectAnnotation());
  yield sagas.post(
    'annotations',
    { image, annotation },
    actions.createAnnotationSuccess
  );
}
