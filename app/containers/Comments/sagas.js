import { put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { initialize } from 'redux-form';
import * as sagas from 'utils/genericSagas';
import { selectNewAnnotation } from 'containers/ProjectAnnotations/selectors';
import {
  buildAnnotation,
  createAnnotation,
} from 'containers/ProjectAnnotations/actions';
import * as types from './constants';
import * as actions from './actions';
import { selectProjectID } from '../ProjectManager/selectors';
import { fetchProject } from '../ProjectManager/actions';

export default [commentsWatcher];

function* commentsWatcher() {
  const watcher = [
    yield takeLatest(types.EDIT_COMMENT, initializeForm),
    yield takeLatest(types.CREATE_COMMENT, createComment),
    yield takeLatest(types.UPDATE_COMMENT, updateComment),
    yield takeLatest(types.DELETE_COMMENT, deleteComment),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createComment({ payload }) {
  const response = yield sagas.post(
    'comments',
    payload,
    actions.createCommentSuccess
  );
  const annotation = yield select(selectNewAnnotation());
  if (annotation.getIn(['annotatable', 'type']) === 'Comment') {
    // Set comment ID in new annotation if present, then create the annotation
    yield put(buildAnnotation({ annotatable: { id: response.payload[0].id } }));
    yield put(createAnnotation());
  }
}

function* updateComment({ payload }) {
  yield sagas.patch(commentURL(payload), payload, actions.updateCommentSuccess);
}

function* deleteComment({ payload }) {
  yield sagas.destroy(
    commentURL(payload),
    payload,
    actions.deleteCommentSuccess
  );
  const projectID = yield select(selectProjectID());
  yield put(fetchProject(projectID));
}

const commentURL = (payload) => `comments/${payload.comment.get('id')}`;

function* initializeForm({ payload }) {
  yield delay(50);
  yield put(initialize('CommentForm', payload, { form: 'CommentForm' }));
}
