/*
 *
 * Projects
 *
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ListProjects from 'components/Projects';
import EditProject from 'components/Projects/Edit';
import { makeSelectList, makeSelectActive } from './selectors';
import { listProjects, showBasics } from './actions';

export class Projects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.listProjects();
  }
  componentDidUpdate() {
    // const currentPath = this.props.location.pathname;
    // const urlID = currentPath.split('/')[2];
    // const activeID = this.props.active.get('id');
    // if (!urlID && activeID) {
    //   browserHistory.push(`/projects/${activeID}`);
    // }
  }
  render() {
    const { active } = this.props;
    if (active.get('id')) {
      return (
        <EditProject />
      );
    } else {
      return (
        <ListProjects
          list={this.props.list}
          onClick={(id) => { this.props.showBasics(id); }}
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
  active: makeSelectActive(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
