/*
 *
 * Projects actions
 *
 */

import {
  LOAD_PROJECTS,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR,
} from './constants';

export function loadProjects() {
  return {
    type: LOAD_PROJECTS,
  };
}

export function projectsLoaded(projects) {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    projects,
  };
}

export function projectLoadingError(error) {
  return {
    type: LOAD_PROJECTS_ERROR,
    error,
  };
}
