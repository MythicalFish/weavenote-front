import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ScrollArea from 'components/ScrollArea';
import ProjectInstructions from 'containers/ProjectInstructions';
import ProjectImages from 'containers/ProjectImages';
import ProjectComponents from 'containers/ProjectComponents';
import ProjectMeasurements from 'containers/ProjectMeasurements';
import { buildAnnotation } from 'containers/ProjectAnnotations/actions';
import Comments from 'containers/Comments';
import Layout from 'components/Layout';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Collaborators from 'containers/Collaborators';
import Header from './subcomponents/Header';
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
    const currentView = this.state.view;

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

    const ViewWrapper = ({ children }) => {
      if (currentView === 'Measurements') return children;
      return <ScrollArea>{children}</ScrollArea>;
    };

    return (
      <Layout
        {...this.props}
        Header={() => (
          <Header
            {...this.props}
            {...{ currentView }}
            changeView={this.changeView}
          />
        )}
      >
        <div className="container-wide px4 pt4 y-fill">
          <div className="row y-fill">
            <div className="col-xs-12 col-md-3 y-fill">
              <ScrollArea className="pr2">
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
        <Modal id="collaborators" minWidth="600px">
          <header className="modal-header">{`Collaborators for ${project.get(
            'name'
          )}`}</header>
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
      </Layout>
    );
  }
}

ProjectManager.propTypes = {
  project: PropTypes.object,
  PDFexport: PropTypes.object,
  fetchProject: PropTypes.func,
  updateProject: PropTypes.func,
  params: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchProject, updateProject, exportPDF, buildAnnotation },
    dispatch
  );
}

const mapState = createStructuredSelector({
  project: selectors.selectProject(),
  avatarList: selectors.selectAvatarList(),
  PDFexport: selectors.selectPDFexport(),
  abilities: selectors.selectAbilities(),
  userRole: selectors.selectUserRole(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
