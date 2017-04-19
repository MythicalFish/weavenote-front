/*
 *
 * Projects
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProjects } from 'containers/App/selectors';
import ProjectsList from 'components/ProjectsList';
import { loadProjects } from '../App/actions';


export class Projects extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadProjects();
  }
  render() {
    const { projects } = this.props;
    const projectsListProps = {
      projects,
    };
    return (
      <div>
        <ProjectsList {...projectsListProps} />
      </div>
    );
  }
}

Projects.propTypes = {
  // missing loading
  // missing error
  projects: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  loadProjects: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadProjects: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadProjects());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
});

// function mapStateToProps(state) { // this works though
//   console.log(state.get('projects'));
//   return {
//     projects: state.get('projects'),
//   };
// }

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
