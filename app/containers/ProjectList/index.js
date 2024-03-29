import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Layout from 'components/Layout';
import Header from './subcomponents/Header';
import Toolbar from './subcomponents/Toolbar';
import List from './subcomponents/List';

import {
  filterProjects,
  fetchProjects,
  createProject,
  fileProject,
  deleteProject,
  duplicateProject,
} from './actions';
import { selectProjects, selectIsLoading } from './selectors';

export class ProjectList extends React.PureComponent {
  state = {
    view: 'Active Styles',
  };

  componentDidMount() {
    this.props.fetchProjects();
  }

  changeView = (view) => {
    this.setState({ view });
  };

  Header = (props) => <Header {...this.props} {...props} />;

  render() {
    const pProps = {
      ...this.props,
      abilities: this.props.abilities.get('Project').toJS(),
      changeView: this.changeView,
      currentView: this.state.view,
      scrollable: true,
    };

    return (
      <Layout {...pProps} Header={this.Header}>
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
      filterProjects,
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
  isLoading: selectIsLoading(),
});

export default connect(mapState, mapDispatch)(ProjectList);
