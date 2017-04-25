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
  makeSelectList, makeSelectActive, makeSelectCurrentView,
  makeSelectCurrentSection,
} from './selectors';
import { listProjects, showProject, updateProject } from './actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  render() {
    const p = this.props;
    switch (p.currentView) {
      case 'show':
        return (
          <ShowProject
            id={p.active.get('id')}
            basics={p.active.get('basics')}
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
  active: React.PropTypes.object,
  listProjects: React.PropTypes.func,
  showProject: React.PropTypes.func,
  updateProject: React.PropTypes.func,
  currentView: React.PropTypes.string,
  currentSection: React.PropTypes.string,
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
  active: makeSelectActive(),
  currentView: makeSelectCurrentView(),
  currentSection: makeSelectCurrentSection(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
