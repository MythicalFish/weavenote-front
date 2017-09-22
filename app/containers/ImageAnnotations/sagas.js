import { take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import { selectNewAnnotation } from './selectors';
import * as types from './constants';
import * as actions from './actions';

export function* ImageAnnotationsWatcher() {
  const watcher = [yield takeLatest(types.CREATE_ANNOTATION, createAnnotation)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createAnnotation() {
  const data = yield select(selectNewAnnotation());
  const a = data.toJS();
  const annotation = {
    image_id: a.imageID,
    annotation_type: a.type,
    anchors_attributes: a.anchors,
  };
  if (a.annotatable) {
    annotation.annotatable_id = a.annotatable.id;
    annotation.annotatable_type = a.annotatable.type;
  }
  yield sagas.post(
    'annotations',
    { annotation },
    actions.createAnnotationSuccess
  );
}
