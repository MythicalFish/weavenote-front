import * as types from './constants';

export function loadProjects() {
  return {
    type: types.LOAD_PROJECTS,
  };
}
export function projectsLoaded(projects) {
  return {
    type: types.LOAD_PROJECTS_SUCCESS,
    projects,
  };
}

export function projectLoadingError(error) {
  return {
    type: types.LOAD_PROJECTS_ERROR,
    error,
  };
}
