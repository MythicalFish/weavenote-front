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

function* createAnnotation({ image }) {
  const a = yield select(selectNewAnnotation());
  const { annotatable, anchors, type } = a.toJS();
  const annotation = {
    image_id: image.get('id'),
    annotation_type: type,
    anchors_attributes: anchors,
  };
  if (annotatable) {
    annotation.annotatable_id = annotatable.id;
    annotation.annotatable_type = annotatable.type;
  }
  yield sagas.post(
    'annotations',
    { annotation },
    actions.createAnnotationSuccess
  );
}
