import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import ProjectImagesReducer from 'containers/ProjectImages/reducer';
import ProjectCommentsReducer from 'containers/ProjectComments/reducer';
import ProjectComponentsReducer from 'containers/ProjectComponents/reducer';
import ProjectInstructionsReducer from 'containers/ProjectInstructions/reducer';
import ProjectMeasurementsReducer from 'containers/ProjectMeasurements/reducer';
import * as types from './constants';
const initialState = fromJS({
  project: null,
  userRole: null,
  PDFexport: {
    isExporting: false,
    downloadURL: null,
  },
});

function ProjectManagerReducer(state = initialState, action) {
  const { response } = action;

  switch (action.type) {
    case types.FETCH_PROJECT:
      return initialState;

    case types.FETCH_PROJECT_SUCCESS:
      return state
        .set('project', fromJS(response.project))
        .set('userRole', fromJS(response.user_role))
        .set('abilities', fromJS(response.abilities))
        .set('avatarList', fromJS(response.avatar_list));

    case types.FETCH_MATERIAL_COST_SUCCESS:
      return state.setIn(['project', 'material_cost'], fromJS(action.response));

    case types.EXPORT_PDF:
      return state
        .setIn(['PDFexport', 'isExporting'], true)
        .setIn(['PDFexport', 'downloadURL'], null);

    case types.EXPORT_PDF_SUCCESS:
      return state
        .setIn(['PDFexport', 'isExporting'], false)
        .setIn(['PDFexport', 'downloadURL'], response.url);

    default:
      return state;
  }
}

export default combineReducers({
  Manager: ProjectManagerReducer,
  Images: ProjectImagesReducer,
  Comments: ProjectCommentsReducer,
  Components: ProjectComponentsReducer,
  Instructions: ProjectInstructionsReducer,
  Measurements: ProjectMeasurementsReducer,
});
