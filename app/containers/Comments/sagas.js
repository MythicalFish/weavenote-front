import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [commentsWatcher];

function* commentsWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_COMMENT, createComment),
    yield takeLatest(types.UPDATE_COMMENT, updateComment),
    yield takeLatest(types.DELETE_COMMENT, deleteComment),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createComment({ payload }) {
  yield sagas.post('comments', payload, actions.createCommentSuccess);
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
}

const commentURL = (payload) => `comments/${payload.comment.get('id')}`;