import { put, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import { fetchProject } from '../ProjectManager/actions';

export default [componentsWatcher];

const componentsURL = (payload, addition = null) => {
  let end = '';
  if (addition) end = `/${addition}`;
  return `projects/${payload.project_id}/components${end}`;
};

const componentURL = (payload) => componentsURL(payload, payload.id);

export function* componentsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_COMPONENTS, fetchComponents),
    yield takeLatest(types.UPDATE_COMPONENT, updateComponent),
    yield takeLatest(types.CREATE_COMPONENT, createComponent),
    yield takeLatest(types.DELETE_COMPONENT, deleteComponent),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

export function* fetchComponents({ payload }) {
  yield sagas.get(componentsURL(payload), null, actions.fetchComponentsSuccess);
}

export function* updateComponent(action) {
  const payload = action.payload.toJS();
  yield sagas.patch(
    componentURL(payload),
    payload,
    actions.updateComponentSuccess
  );
  yield put(fetchProject(payload.project_id));
}

export function* createComponent({ payload }) {
  yield sagas.post(
    componentsURL(payload),
    payload,
    actions.createComponentSuccess
  );
}

export function* deleteComponent({ payload }) {
  yield sagas.destroy(
    componentURL(payload),
    null,
    actions.deleteComponentSuccess
  );
}
