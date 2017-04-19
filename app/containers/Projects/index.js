/*
 *
 * Projects
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProjectsList from 'components/ProjectsList';
import { selectProjects } from './selectors';
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
  projects: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  loadProjects: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  projects: (state) => {
    return state.projects;
  },
});

// function mapStateToProps(state) { // this works though
//   console.log(state.get('projects'));
//   return {
//     projects: state.get('projects'),
//   };
// }

export function mapDispatchToProps(dispatch) {
  return {
    loadProjects: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadProjects());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
