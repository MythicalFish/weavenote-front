/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * Reducers added by me
 */
import collaboratorsReducer from 'containers/Collaborators/reducer';
import commentsReducer from 'containers/Comments/reducer';
import uploadReducer from 'containers/ImageUploader/reducer';
import materialListReducer from 'containers/MaterialList/reducer';
import materialManagerReducer from 'containers/MaterialManager/reducer';
import { reducer as reduxFormReducer } from 'redux-form/immutable';
import { reducer as notificationReducer } from 'react-notification-system-redux';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    form: reduxFormReducer,
    notifications: notificationReducer,
    collaborators: collaboratorsReducer,
    Comments: commentsReducer,
    ImageUploader: uploadReducer,
    MaterialList: materialListReducer,
    Material: materialManagerReducer,
    ...asyncReducers,
  });
}
