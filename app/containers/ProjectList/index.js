import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectAbilities } from 'containers/App/selectors';
import Header from 'components/Header';
import Toolbar from './subcomponents/Toolbar';
import ListItem from './subcomponents/ListItem';
import {
  fetchProjects,
  createProject,
  fileProject,
  deleteProject,
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
      <div>
        <Header />
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
                    fileProject={this.props.fileProject}
                    deleteProject={this.props.deleteProject}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ProjectList.propTypes = {
  projects: PropTypes.object,
  fetchProjects: PropTypes.func,
  fileProject: PropTypes.func,
  deleteProject: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchProjects, createProject, deleteProject, fileProject },
    dispatch
  );
}

const mapState = createStructuredSelector({
  projects: selectProjects(),
  abilities: selectAbilities(),
});

export default connect(mapState, mapDispatch)(ProjectList);
