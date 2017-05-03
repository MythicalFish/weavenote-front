/*
 *
 * Projects
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProjectList from './sections/List';
import {
  selectProjectsList, selectCurrentSection,
} from './selectors';
import { listProjects, createProject } from './actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  render() {
    const p = this.props;
    return (
      <ProjectList
        projectsList={p.projectsList}
        listProjects={p.listProjects}
        createProject={p.createProject}
      />
    );
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
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(Projects);
