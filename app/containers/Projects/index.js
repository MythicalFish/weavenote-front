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
import { listProjects, updateProject, createProject } from './actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  render() {
    const p = this.props;
    if (this.props.params.id) {
      return this.props.children;
    }
    return (
      <ListProjects
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
  updateProject: PropTypes.func,
  currentView: PropTypes.object,
  currentSection: PropTypes.object,
  params: PropTypes.object,
  children: React.PropTypes.node,
};

export function mapDispatchToProps(dispatch) {
  return {
    listProjects: (params) => dispatch(listProjects(params)),
    createProject: (data) => dispatch(createProject(data)),
    updateProject: (data) => dispatch(updateProject(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  projectsList: selectProjectsList(),
  currentProject: selectCurrentProject(),
  currentView: makeSelectCurrentView(),
  currentSection: selectCurrentSection(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
