import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';

export function* ProjectInstructionsWatcher() {
  const watcher = [
    yield takeLatest(types.FETCH_INSTRUCTIONS, fetchInstructions),
    yield takeLatest(types.CREATE_INSTRUCTION, createInstruction),
    yield takeLatest(types.UPDATE_INSTRUCTION, updateInstruction),
    yield takeLatest(types.DELETE_INSTRUCTION, deleteInstruction),
  ];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* fetchInstructions(action) {
  yield sagas.get(
    `projects/${action.projectID}/instructions`,
    null,
    actions.fetchInstructionsSuccess
  );
}

function* updateInstruction({ payload }) {
  const instruction = payload.toJS();
  yield sagas.patch(
    `projects/${instruction.project_id}/instructions/${instruction.id}`,
    { instruction },
    actions.updateInstructionSuccess
  );
}

function* createInstruction({ payload }) {
  const { title, description, project_id } = payload.toJS();
  const instruction = { project_id, title, description };
  yield sagas.post(
    `projects/${project_id}/instructions`,
    { instruction },
    actions.createInstructionSuccess
  );
}

function* deleteInstruction(action) {
  yield sagas.destroy(
    `projects/${action.projectID}/instructions/${action.id}`,
    null,
    actions.deleteInstructionSuccess
  );
}
