import { take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import { selectNewAnnotation } from './selectors';
import * as types from './constants';
import * as actions from './actions';

export function* ProjectImagesWatcher() {
  const watcher = [yield takeLatest(types.CREATE_ANNOTATION, createAnnotation)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createAnnotation({ image }) {
  const annotation = yield select(selectNewAnnotation());
  const { annotatable, anchors, type } = annotation.toJS();
  const params = {
    annotation: {
      image_id: image.get('id'),
      annotation_type: type,
      annotatable_id: annotatable.id,
      annotatable_type: annotatable.type,
      anchors_attributes: anchors,
    },
  };
  yield sagas.post('annotations', params, actions.createAnnotationSuccess);
}
