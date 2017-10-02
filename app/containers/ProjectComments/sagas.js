import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export function* ProjectCommentsWatcher() {
  const watcher = [yield takeLatest(types.FETCH_COMMENTS, fetchComments)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchComments({ payload }) {
  yield sagas.get('comments', payload, actions.fetchCommentsSuccess);
}
