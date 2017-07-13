import {
  call,
  put,
  take,
  cancel,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as API from 'utils/API';
import * as sagas from 'utils/genericSagas';
import { materialListWatcher } from 'containers/MaterialList/sagas';
import * as types from './constants';
import * as actions from './actions';
import * as imgActions from '../ImageManager/constants';
import { selectProjectCurrentImage } from './selectors';

export default [projectManagerWatcher, materialListWatcher];

export function* projectManagerWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_PROJECT, fetchProject),
    yield takeLatest(types.UPDATE_PROJECT, updateProject),

    yield takeLatest(types.FETCH_MEASUREMENTS, fetchMeasurements),
    yield takeLatest(types.UPDATE_MEASUREMENTS, updateMeasurements),
    yield takeLatest(types.CREATE_MEASUREMENT_GROUP, createMeasurementGroup),
    yield takeLatest(types.CREATE_MEASUREMENT_NAME, createMeasurementName),

    yield takeLatest(imgActions.SWITCH_IMAGE, resetImageForm),
    yield takeLatest(imgActions.DELETE_IMAGE_SUCCESS, resetImageForm),
    yield takeLatest(imgActions.CREATE_IMAGE_SUCCESS, resetImageForm),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* resetImageForm() {
  const i = yield select(selectProjectCurrentImage());
  yield put(initialize('ImageForm', i, { form: 'ImageForm' }));
}

/*
 *
 *  Project
 *
 */

export function* fetchProject(action) {
  yield sagas.get(`projects/${action.id}`, null, actions.fetchProjectSuccess);
}

export function* updateProject(action) {
  const project = action.project.toJS();
  yield sagas.patch(
    `projects/${project.id}`,
    { project },
    actions.updateProjectSuccess
  );
}

/*
 *
 *  Measurements
 *
 */

export function* fetchMeasurements(action) {
  yield sagas.get(
    `projects/${action.projectID}/measurements`,
    null,
    actions.fetchMeasurementsSuccess
  );
}

export function* createMeasurementGroup(action) {
  const group = { name: 'X' };
  yield sagas.post(
    `projects/${action.projectID}/measurement_groups`,
    { group },
    actions.createMeasurementGroupSuccess
  );
}

export function* createMeasurementName(action) {
  const name = { value: 'Untitled' };
  yield sagas.post(
    `projects/${action.projectID}/measurement_names`,
    { name },
    actions.createMeasurementNameSuccess
  );
}

export function* updateMeasurements(action) {
  const measurements = action.measurements.toJS();
  const projectID = measurements.groups[0].project_id;
  try {
    const response = yield call(
      API.patch,
      `projects/${projectID}/measurements`,
      { measurements }
    );
    yield put(actions.updateMeasurementsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
