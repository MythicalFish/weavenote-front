import { put, take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getFormValues, isDirty } from 'redux-form/immutable';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { fetchMaterialCost } from '../ProjectManager/actions';
import { selectProjectID } from '../ProjectManager/selectors';

const componentsURL = (payload, addition = null) => {
  let end = '';
  if (addition) end = `/${addition}`;
  return `projects/${payload.project_id}/components${end}`;
};

const componentURL = (payload) => componentsURL(payload, payload.id);

export function* ProjectComponentsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_COMPONENTS, fetchComponents),
    yield takeLatest(types.UPDATE_COMPONENT, updateComponent),
    yield takeLatest(types.CREATE_COMPONENTS, createComponents),
    yield takeLatest(types.DELETE_COMPONENT, deleteComponent),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchComponents({ payload }) {
  yield sagas.get(componentsURL(payload), null, actions.fetchComponentsSuccess);
}

function* updateComponent() {
  const dirty = yield select(isDirty('Component'));
  if (!dirty) return;
  const component = yield select(getFormValues('Component'));
  yield sagas.patch(
    componentURL(component.toJS()),
    { component },
    actions.updateComponentSuccess
  );
  yield put(fetchMaterialCost(component.get('project_id')));
}

function* createComponents() {
  const projectID = yield select(selectProjectID());
  const materialIDs = yield select(selectors.selectSelectedMaterials());
  yield sagas.post(
    `projects/${projectID}/components`,
    { ids: materialIDs },
    actions.createComponentsSuccess
  );
}

function* deleteComponent({ payload }) {
  yield sagas.destroy(
    componentURL(payload),
    null,
    actions.deleteComponentSuccess
  );
  yield put(fetchMaterialCost(payload.project_id));
}
