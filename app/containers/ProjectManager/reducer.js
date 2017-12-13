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

const initialState = fromJS({});

function ProjectManagerReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    case types.FETCH_PROJECT:
      return initialState;

    case types.FETCH_PROJECT_SUCCESS:
      return fromJS(response.project).set(
        'material_cost',
        response.material_cost
      );

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state.set('material_cost', fromJS(response));

    default:
      return state;
  }
}

const initialRoleState = fromJS({
  role_type: null,
  abilities: null,
});

function RoleReducer(state = initialRoleState, { type, response }) {
  switch (type) {
    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('role_type', fromJS(response.user_role))
        .set('abilities', fromJS(response.abilities));
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
  user: RoleReducer,
});

export { instructionFormReducer };
