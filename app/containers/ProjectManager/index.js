import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectFocus } from 'containers/App/selectors';
import { openModal } from 'containers/App/actions';
import ProjectInstructions from 'containers/ProjectInstructions';
import ProjectImages from 'containers/ProjectImages';
import ProjectComponents from 'containers/ProjectComponents';
import ProjectMeasurements from 'containers/ProjectMeasurements';
import ProjectComments from 'containers/ProjectComments';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Collaborators from 'containers/Collaborators';
import Toolbar from './subcomponents/Toolbar';
import ProjectBasics from './subcomponents/ProjectBasics';
import * as selectors from './selectors';
import { fetchProject, updateProject, exportPDF } from './actions';

class ProjectManager extends React.PureComponent {
  state = { view: 'Basics' };
  componentDidMount() {
    const { params } = this.props;
    this.props.fetchProject(params.id);
  }
  changeView = (view) => {
    this.setState({ view });
  };
  render() {
    const { project, PDFexport } = this.props;
    if (!project) return null;
    const id = project.get('id');
    let View;
    const viewProps = { ...this.props };

    switch (this.state.view) {
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
      <div>
        <Toolbar
          {...this.props}
          changeView={this.changeView}
          currentView={this.state.view}
        />
        <div className="container-wide p4">
          <div className="row">
            <div className="col-xs-12 col-md-3 last-xs first-md blurrable">
              <ProjectComments project={project} />
            </div>
            <div className="col-xs-6 col-md-6 blurrable">
              <div className="lh0 px4">
                <ProjectImages project={project} />
              </div>
            </div>
            <div className="col-xs-6 col-md-3 blurrable">
              <View {...viewProps} />
            </div>
          </div>
        </div>
        <Modal id="collaborators" minWidth="600px">
          <header>{`Collaborators for ${project.get('name')}`}</header>
          <Collaborators invitable={{ type: 'Project', id }} />
        </Modal>
        <Modal id="export">
          {PDFexport.get('isExporting') && <Spinner />}
          {PDFexport.get('downloadURL') && (
            <Button
              newTab={PDFexport.get('downloadURL')}
              label="Download"
              icon="DownloadCloud"
            />
          )}
        </Modal>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  project: React.PropTypes.object,
  PDFexport: React.PropTypes.object,
  changeSection: React.PropTypes.func,
  fetchProject: React.PropTypes.func,
  updateProject: React.PropTypes.func,
  params: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchProject, updateProject, openModal, exportPDF },
    dispatch
  );
}

const mapState = createStructuredSelector({
  project: selectors.selectProject(),
  avatarList: selectors.selectAvatarList(),
  PDFexport: selectors.selectPDFexport(),
  abilities: selectors.selectAbilities(),
  userRole: selectors.selectUserRole(),
  focus: selectFocus(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
