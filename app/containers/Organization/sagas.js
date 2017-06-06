
import { take, takeLatest, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [orgWatcher];

function* orgWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_ORG, createOrg),
    yield takeLatest(types.CREATE_ORG_SUCCESS, redirectToDashboard),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* createOrg({ organization }) {
  yield sagas.post('organizations', { organization }, actions.createOrgSuccess);
}

const redirectToDashboard = () => {
  browserHistory.push('/');
};
