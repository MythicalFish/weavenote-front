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
import * as aActions from 'containers/App/actions';
import { selectAnnotation } from './selectors';
import * as types from './constants';
import * as actions from './actions';

export default [watch];

function* watch() {
  const watcher = [
    yield takeLatest(types.CREATE_ANNOTATION, createAnnotation),
    yield takeLatest(types.ADD_ANNOTATION, bringFocus),
    yield takeLatest(types.CANCEL_ANNOTATION, hideFocus),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createAnnotation({ image }) {
  const annotation = yield select(selectAnnotation());
  const image_id = image.get('id');
  yield sagas.post(
    'annotations',
    { image_id, ...annotation.toJS() },
    actions.createAnnotationSuccess
  );
}

function* bringFocus() {
  yield put(aActions.bringFocus('annotation'));
}
function* hideFocus() {
  yield put(aActions.hideFocus());
}
