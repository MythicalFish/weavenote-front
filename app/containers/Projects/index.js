/*
 *
 * Projects
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ListProjects from 'components/Projects';
import ShowProject from 'components/Projects/Show';
import { makeSelectList, makeSelectActive, makeSelectCurrentView } from './selectors';
import { listProjects, showProject, updateProject } from './actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  render() {
    switch (this.props.currentView) {
      case 'show':
        return (
          <ShowProject
            id={this.props.active.get('id')}
            basics={this.props.active.get('basics')}
            onSubmit={(data) => { this.props.updateProject(data); }}
          />
        );
      default:
        return (
          <ListProjects
            list={this.props.list}
            onClick={(id) => { this.props.showProject(id); }}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
