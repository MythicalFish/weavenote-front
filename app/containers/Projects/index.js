/*
 *
 * Projects
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ListProjects, ShowProject } from 'modules/Projects';
import {
  makeSelectList, selectCurrentProject, makeSelectCurrentView,
  selectCurrentSection,
} from './selectors';
import { listProjects, showProject, updateProject } from './actions';
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
            onSubmit={(data) => { p.updateProject(data); }}
            currentSection={p.currentSection}
          />
        );
      default:
        return (
          <ListProjects
            list={p.list}
            onClick={(id) => { p.showProject(id); }}
          />
        );
    }
  }
}

Projects.propTypes = {
  list: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  currentProject: React.PropTypes.object,
  listProjects: React.PropTypes.func,
  showProject: React.PropTypes.func,
  updateProject: React.PropTypes.func,
  currentView: React.PropTypes.object,
  currentSection: React.PropTypes.object,
  changeSection: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    listProjects: () => dispatch(listProjects()),
    showProject: (id) => dispatch(showProject(id)),
    updateProject: (data) => dispatch(updateProject(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
  currentProject: selectCurrentProject(),
  currentView: makeSelectCurrentView(),
  currentSection: selectCurrentSection(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
