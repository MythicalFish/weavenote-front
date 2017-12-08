import { take, cancel, takeLatest, select, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import { selectNewAnnotation } from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { fetchComments, writeComment } from '../Comments/actions';
import { selectProjectID } from '../ProjectManager/selectors';

export function* ProjectAnnotationsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_ANNOTATIONS, fetchAnnotations),
    yield takeLatest(types.CREATE_ANNOTATION, createAnnotation),
    yield takeLatest(types.UPDATE_ANNOTATION, updateAnnotation),
    yield takeLatest(types.DELETE_ANNOTATION, deleteAnnotation),
    yield takeLatest(types.SET_ANCHOR, handleSetAnchor),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchAnnotations({ archived }) {
  const projectID = yield select(selectProjectID());
  yield sagas.get(
    'annotations',
    { project_id: projectID, archived },
    actions.fetchAnnotationsSuccess
  );
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

function* updateAnnotation({ payload }) {
  const { id, image_id, anchors: anchors_attributes } = payload;
  yield sagas.patch(
    `annotations/${id}`,
    { annotation: { anchors_attributes, image_id } },
    actions.updateAnnotationSuccess
  );
}

function* deleteAnnotation({ payload }) {
  const { id, image_id } = payload;
  yield sagas.destroy(
    `annotations/${id}`,
    { annotation: { image_id } },
    actions.deleteAnnotationSuccess
  );
  const projectID = yield select(selectProjectID());
  yield put(fetchComments({ commentable: { type: 'Project', id: projectID } }));
}

function* handleSetAnchor() {
  const annotation = yield select(selectNewAnnotation());
  const annotatable = annotation.get('annotatable');
  // if done annotating
  if (annotation.get('maxAnchors') === annotation.get('anchors').size) {
    // if is commentable
    if (annotatable && annotatable.get('type') === 'Comment') {
      // if comment created
      if (annotatable.get('id')) {
        yield put(actions.createAnnotation());
      } else {
        // if no comment created
        yield put(writeComment());
      }
    } else {
      yield put(actions.createAnnotation());
    }
  }
}
