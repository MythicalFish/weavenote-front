import { call, put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import AuthService from 'utils/AuthService';
import * as types from './constants';

// TODO: use dotenv for these vars
const AUTH0_CLIENT_ID = '2j5Y7oyQLUAQtcCAeqxbrdrFrWT3gO19';
const AUTH0_DOMAIN = 'mythic.eu.auth0.com';

const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

export function* showAuth() {
  const requestURL = 'http://localhost:4000/projects';
  try {
    const projects = yield call(request, requestURL);
    yield put(projectsLoaded(projects));
  } catch (err) {
    console.error(err);
  }
}

export function* startAuth() {
  const watcher = yield takeLatest(types.SHOW_LOCK, showAuth); 
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  startAuth,
];
