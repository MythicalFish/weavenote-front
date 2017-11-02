import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ScrollArea from 'components/ScrollArea';
import ProjectInstructions from 'containers/ProjectInstructions';
import ProjectImages from 'containers/ProjectImages';
import ProjectComponents from 'containers/ProjectComponents';
import ProjectMeasurements from 'containers/ProjectMeasurements';
import ProjectExport from 'containers/ProjectExport';
import { buildAnnotation } from 'containers/ProjectAnnotations/actions';
import Comments from 'containers/Comments';
import Layout from 'components/Layout';
import Modal from 'components/Modal';
import Collaborators from 'containers/Collaborators';
import Header from './subcomponents/Header';
import ProjectBasics from './subcomponents/ProjectBasics';
import * as selectors from './selectors';
import { fetchProject, updateProject } from './actions';

class ProjectManager extends React.PureComponent {
  state = { view: 'Basics' };
  componentDidMount() {
    const { params } = this.props;
    this.props.fetchProject(params.id);
  }
  changeView = (view) => {
    this.setState({ view });
  };
  Header = () => (
    <Header
      {...this.props}
      currentView={this.state.view}
      changeView={this.changeView}
    />
  );

  ViewWrapper = ({ children }) => {
    if (this.state.view === 'Measurements') return children;
    return <ScrollArea className="pl4">{children}</ScrollArea>;
  };
  render() {
    const { project } = this.props;
    if (!project) return null;
    const id = project.get('id');
    let View;
    const viewProps = { ...this.props };
    const currentView = this.state.view;
    const { ViewWrapper } = this;

    switch (currentView) {
      case 'Materials':
        View = ProjectComponents;
        break;

      case 'Measurements':
        View = ProjectMeasurements;
        break;

      case 'Instructions':
        View = ProjectInstructions;
        break;

      default:
        View = ProjectBasics;
        viewProps.initialValues = project;
        viewProps.onSubmit = this.props.updateProject;
        break;
    }

    return (
      <Layout {...this.props} Header={this.Header}>
        <div className="container-wide px4 pt4 y-fill">
          <div className="row y-fill lg-mln4">
            <div className="col-xs-12 col-md-3 y-fill">
              <ScrollArea className="pr4 lg-pl4">
                <Comments
                  {...this.props}
                  commentable={{ type: 'Project', id }}
                />
              </ScrollArea>
            </div>
            <div className="col-xs-6 col-md-6 y-fill">
              <ScrollArea className="pb4">
                <ProjectImages {...{ project, currentView }} />
              </ScrollArea>
            </div>
            <div className="col-xs-6 col-md-3 y-fill">
              <ViewWrapper>
                <View {...viewProps} />
              </ViewWrapper>
            </div>
          </div>
        </div>
        <Modal id="collaborators" width="700px" cosy>
          <header className="modal-header">{`Collaborators for ${project.get(
            'name'
          )}`}</header>
          <div className="modal-body">
            <Collaborators invitable={{ type: 'Project', id }} />
          </div>
        </Modal>
        <ProjectExport {...this.props} />
      </Layout>
    );
  }
}

ProjectManager.propTypes = {
  project: PropTypes.object,
  fetchProject: PropTypes.func,
  updateProject: PropTypes.func,
  params: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchProject, updateProject, buildAnnotation },
    dispatch
  );
}

const mapState = createStructuredSelector({
  project: selectors.selectProject(),
  avatarList: selectors.selectAvatarList(),
  abilities: selectors.selectAbilities(),
  userRole: selectors.selectUserRole(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
