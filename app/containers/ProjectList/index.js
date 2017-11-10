import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Layout from 'components/Layout';
import Toolbar from './subcomponents/Toolbar';
import List from './subcomponents/List';
import {
  fetchProjects,
  createProject,
  fileProject,
  deleteProject,
  duplicateProject,
} from './actions';
import { selectProjects } from './selectors';

export class ProjectList extends React.PureComponent {
  state = { view: 'Active Styles' };
  componentDidMount() {
    this.props.fetchProjects();
  }
  changeView = (view) => {
    this.setState({ view });
  };
  render() {
    const pProps = {
      ...this.props,
      abilities: this.props.abilities.get('Project').toJS(),
      changeView: this.changeView,
      currentView: this.state.view,
      scrollable: true,
    };
    return (
      <Layout {...pProps}>
        <Toolbar {...pProps} />
        <List {...pProps} />
      </Layout>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func,
  abilities: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchProjects,
      createProject,
      deleteProject,
      fileProject,
      duplicateProject,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  projects: selectProjects(),
});

export default connect(mapState, mapDispatch)(ProjectList);
