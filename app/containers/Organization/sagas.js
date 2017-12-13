import { take, takeLatest, cancel, put, select } from 'redux-saga/effects';
import { getFormValues } from 'redux-form/immutable';
import { initialize } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import { selectOrganization } from '../App/selectors';
import * as appTypes from '../App/constants';

export default [orgWatcher];

function* orgWatcher() {
  const watcher = [
    yield takeLatest(types.CREATE_ORGANIZATION, createOrganization),
    yield takeLatest(types.CREATE_ORGANIZATION_SUCCESS, orgSuccess),
    yield takeLatest(types.UPDATE_ORGANIZATION, updateOrganization),
    yield takeLatest(appTypes.SWITCH_ORGANIZATION_SUCCESS, switchOrganization),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* switchOrganization() {
  const o = yield select(selectOrganization());
  yield put(initialize('OrganizationForm', o, { form: 'OrganizationForm' }));
}

function* createOrganization({ organization }) {
  yield sagas.post(
    'organizations',
    { organization },
    actions.createOrganizationSuccess
  );
}

function* updateOrganization() {
  const organization = yield select(getFormValues('OrgInfo'));
  yield sagas.patch(
    orgUrl(organization),
    { organization },
    actions.updateOrganizationSuccess
  );
}

function* orgSuccess() {
  browserHistory.push('/');
}
const orgUrl = (org) => `organizations/${org.get('id')}`;
