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


export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadProjects();
  }
  render() {
    const { items } = this.props;
    const projectsListProps = {
      items,
    };
    return (
      <div>
        <ProjectsList {...projectsListProps} />
      </div>
    );
  }
}

Projects.propTypes = {
  items: React.PropTypes.oneOfType([
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
  items: makeSelectProjects(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
