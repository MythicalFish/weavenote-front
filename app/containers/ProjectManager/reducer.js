import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import ProjectImagesReducer from 'containers/ProjectImages/reducer';
import ProjectComponentsReducer from 'containers/ProjectComponents/reducer';
import ProjectInstructionsReducer, {
  formReducer as instructionFormReducer,
} from 'containers/ProjectInstructions/reducer';
import ProjectMeasurementsReducer from 'containers/ProjectMeasurements/reducer';
import ProjectAnnotationsReducer from 'containers/ProjectAnnotations/reducer';
import ProjectExportReducer from 'containers/ProjectExport/reducer';
import * as types from './constants';
const initialState = fromJS({
  project: null,
  userRole: null,
});

function ProjectManagerReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    case types.FETCH_PROJECT:
      return initialState;

    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('project', fromJS(response.project))
        .set('userRole', response.user_role)
        .set('abilities', fromJS(response.abilities))
        .set('collaborators', fromJS(response.collaborators));

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state.setIn(['project', 'material_cost'], fromJS(action.response));

    default:
      return state;
  }
}

export default combineReducers({
  Manager: ProjectManagerReducer,
  Images: ProjectImagesReducer,
  Annotations: ProjectAnnotationsReducer,
  Components: ProjectComponentsReducer,
  Instructions: ProjectInstructionsReducer,
  Measurements: ProjectMeasurementsReducer,
  Export: ProjectExportReducer,
});

export { instructionFormReducer };
