/*
 *
 * Projects
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProjectsList from 'components/ProjectsList';
import makeSelectProjects from './selectors';
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
  componentDidUpdate() {
    //console.log('asdasdasd')
  }
  // onSelectProject(id) {
  //   // this.props === undefined
  //   this.props.showBasics(id);
  // }
  render() {
    const projectsListProps = {
      list: this.props.list,
      // onSelectProject: this.props.showBasics, // cannot
    };
    return (
      <ProjectsList {...projectsListProps} />
    );
  }
}

Projects.propTypes = {
  list: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  listProjects: React.PropTypes.func,
  showBasics: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    listProjects: () => dispatch(listProjects()),
    showBasics: () => dispatch(showBasics()),
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectProjects(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
