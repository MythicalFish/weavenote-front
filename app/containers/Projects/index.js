/*
 *
 * Projects
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ListProjects, ShowProject } from 'modules/Projects';
import {
  selectProjectsList, selectCurrentProject, makeSelectCurrentView,
  selectCurrentSection,
} from './selectors';
import { listProjects, createProject } from './actions';
import * as views from './constants/views';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  render() {
    const p = this.props;
    switch (p.currentView.key) {
      case views.Show.key:
        return (
          <ShowProject
            currentProject={p.currentProject}
            currentSection={p.currentSection}
          />
        );
      default:
        return (
          <ListProjects
            projectsList={p.projectsList}
            listProjects={p.listProjects}
            createProject={p.createProject}
          />
        );
    }
  }
}

Projects.propTypes = {
  projectsList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  currentProject: PropTypes.object,
  listProjects: PropTypes.func,
  createProject: PropTypes.func,
  currentView: PropTypes.object,
  currentSection: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    listProjects: (params) => dispatch(listProjects(params)),
    createProject: (data) => dispatch(createProject(data)),
  };
}

const mapState = createStructuredSelector({
  projectsList: selectProjectsList(),
  currentProject: selectCurrentProject(),
  currentView: makeSelectCurrentView(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(Projects);
