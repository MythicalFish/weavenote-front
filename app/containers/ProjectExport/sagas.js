import { take, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as sagas from 'utils/genericSagas';
import * as types from './constants';
import * as actions from './actions';
import { selectOptions } from './selectors';
import { selectProject } from '../ProjectManager/selectors';

export function* ProjectExportWatcher() {
  const watcher = [yield takeLatest(types.EXPORT_PDF, exportPDF)];
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

function* exportPDF() {
  const project = yield select(selectProject());
  const options = yield select(selectOptions());
  yield sagas.get(
    `projects/${project.get('id')}/export`,
    options.toJS(),
    actions.doExportSuccess
  );
}
