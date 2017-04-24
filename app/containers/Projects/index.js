/*
 *
 * Projects
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProjectsList from 'components/ProjectsList';
import { makeSelectList, makeSelectCurrent } from './selectors';
import { listProjects, showBasics } from './actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const currentPath = this.props.location.pathname;
    const projectID = currentPath.split('/')[2];
    if (projectID) {
      this.props.showBasics(projectID);
    } else {
      this.props.listProjects();
    }
  }
  render() {
    if (this.props.current.get('id')) {
      return (
        <div>
          form goes here
        </div>
      );
    } else {
      const projectsListProps = {
        list: this.props.list,
        onClick: (id) => { this.props.showBasics(id); },
      };
      return (
        <ProjectsList {...projectsListProps} />
      );
    }
  }
}

Projects.propTypes = {
  list: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  current: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  listProjects: React.PropTypes.func,
  showBasics: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    listProjects: () => dispatch(listProjects()),
    showBasics: (id) => dispatch(showBasics(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
  current: makeSelectCurrent(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
