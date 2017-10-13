import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Layout from 'components/Layout';
import Toolbar from './subcomponents/Toolbar';
import ListItem from './subcomponents/ListItem';
import {
  fetchProjects,
  createProject,
  fileProject,
  deleteProject,
  duplicateProject,
} from './actions';
import { selectProjects } from './selectors';

export class ProjectList extends React.PureComponent {
  state = { view: 'Active Projects' };
  componentDidMount() {
    this.props.fetchProjects();
  }
  changeView = (view) => {
    this.setState({ view });
  };
  render() {
    const { projects } = this.props;
    return (
      <Layout {...this.props}>
        <Toolbar
          {...this.props}
          currentView={this.state.view}
          changeView={this.changeView}
        />
        <div className="container-narrow px2 py4">
          <table>
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Style number</th>
                <th>Collection</th>
                <th>Notifications</th>
                <th>Team</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects.map((project, index) => (
                  <ListItem
                    key={`project-${index}`}
                    project={project}
                    {...this.props}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

ProjectList.propTypes = {
  projects: PropTypes.object,
  fetchProjects: PropTypes.func,
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
