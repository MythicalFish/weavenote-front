import { put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { initialize } from 'redux-form';
import * as sagas from 'utils/genericSagas';
import { selectNewAnnotation } from 'containers/ProjectAnnotations/selectors';
import { selectCurrentImage } from 'containers/ProjectImages/selectors';
import {
  fetchAnnotations,
  buildAnnotation,
  createAnnotation,
} from 'containers/ProjectAnnotations/actions';
import * as types from './constants';
import * as actions from './actions';

export default [commentsWatcher];

function* commentsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_COMMENTS, fetchComments),
    yield takeLatest(types.EDIT_COMMENT, initializeForm),
    yield takeLatest(types.CREATE_COMMENT, createComment),
    yield takeLatest(types.UPDATE_COMMENT, updateComment),
    yield takeLatest(types.DELETE_COMMENT, deleteComment),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchComments({ payload }) {
  yield sagas.get('comments', payload, actions.fetchCommentsSuccess);
}

function* createComment({ payload }) {
  const response = yield sagas.post(
    'comments',
    payload,
    actions.createCommentSuccess
  );
  const { commentable, comments } = response;
  if (commentable.type !== 'Project') return;
  yield associateAnnotation({ id: comments[0].id });
  // Refresh comments (needs new annotation ID)
  yield delay(500);
  yield put(actions.fetchComments({ commentable }));
}

function* updateComment({ payload }) {
  const p = payload;
  yield sagas.patch(commentURL(p), p, actions.updateCommentSuccess);
}

function* deleteComment({ payload }) {
  yield sagas.destroy(
    commentURL(payload),
    payload,
    actions.deleteCommentSuccess
  );
  yield put(fetchAnnotations());
}

const commentURL = (payload) => `comments/${payload.comment.id}`;

function* initializeForm({ payload }) {
  yield delay(50);
  yield put(initialize('CommentForm', payload, { form: 'CommentForm' }));
}

function* associateAnnotation(annotatable) {
  const annotation = yield select(selectNewAnnotation());
  const image = yield select(selectCurrentImage());
  const imageID = image.get('id');
  if (annotation.getIn(['annotatable', 'type']) === 'Comment') {
    // Set comment ID in new annotation if present
    yield put(buildAnnotation({ annotatable, imageID }));
    // Create the annotation
    yield put(createAnnotation());
  }
}
