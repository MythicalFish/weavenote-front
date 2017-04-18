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
import { loadProjects } from './actions';

export class Projects extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    console.log('componentWillMount');
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
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadProjects());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
