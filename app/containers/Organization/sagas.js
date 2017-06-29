
import { take, takeLatest, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export default [orgWatcher];

function* orgWatcher() {
  const watcher = [
    yield takeLatest(types.INITIALIZE_ORGANIZATION, initializeOrganization),
    yield takeLatest(types.CREATE_ORGANIZATION, createOrg),
    yield takeLatest(types.CREATE_ORGANIZATION_SUCCESS, orgSuccess),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* initializeOrganization() {
  if (location.pathname !== '/organization') {
    browserHistory.push('/organization');
  }
} 

function* createOrg({ organization }) {
  yield sagas.post('organizations', { organization }, actions.createOrgSuccess);
}

function* orgSuccess() {
  browserHistory.push('/');
}

