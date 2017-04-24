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
import { listProjects } from './actions';
import List from './views/List';


export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  render() {
    const { list } = this.props;
    const projectsListProps = {
      list,
    };
    return (
      <div>
        <ProjectsList {...projectsListProps} />
      </div>
    );
  }
}

const currentView = () => {
  console.log('asd');
};

Projects.propTypes = {
  list: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  listProjects: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    listProjects: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(listProjects());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectProjects(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
