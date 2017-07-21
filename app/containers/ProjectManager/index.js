import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection, openModal } from 'containers/App/actions';
import ProjectInstructions from 'containers/ProjectInstructions';
import ImageManager from 'containers/ImageManager';
import ProjectComponents from 'containers/ProjectComponents';
import ProjectMeasurements from 'containers/ProjectMeasurements';
import Comments from 'containers/Comments';
import Modal from 'components/Modal';
import Header from 'components/Header';
import Collaborators from 'containers/Collaborators';
import Toolbar from './subcomponents/Toolbar';
import ProjectBasics from './subcomponents/ProjectBasics';
import * as selectors from './selectors';
import { fetchProject, updateProject } from './actions';
import { IMAGE_PLACEHOLDER } from './constants';

class ProjectManager extends React.PureComponent {
  componentDidMount() {
    const { params } = this.props;
    this.props.fetchProject(params.id);
    this.props.changeSection(sections.Basics);
  }

  render() {
    const { project, currentSection } = this.props;
    const id = project.get('id');
    if (!id) return null;
    let View;
    const viewProps = { ...this.props };

    switch (currentSection.id) {
      case sections.Components.id:
        View = ProjectComponents;
        break;

      case sections.Measurements.id:
        View = ProjectMeasurements;
        break;

      case sections.Instructions.id:
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
        <Header />
        <Toolbar {...this.props} />
        <div className="p2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 last-xs first-md col-md-3">
                <Comments
                  comments={this.props.comments}
                  commentable={{ type: 'Project', id: project.get('id') }}
                />
              </div>
              <div className="col-xs-6 col-md-5 flex justify-center">
                <div className="flex flex-column items-center lh0">
                  <ImageManager
                    images={project.get('images')}
                    imageable={{
                      type: 'Project',
                      id,
                    }}
                    maxImages={5}
                    allowEdit
                    showUploader
                    currentImage={this.props.currentImage}
                    placeholder={IMAGE_PLACEHOLDER}
                  />
                </div>
              </div>
              <div className="col-xs-6 col-md-4 flex justify-center">
                <View {...viewProps} />
              </div>
            </div>
          </div>
        </div>
        <Modal modalID="collaborators" minWidth="600px">
          <header>
            {`Collaborators for ${project.get('name')}`}
          </header>
          <Collaborators
            invitable={{ type: 'Project', id: project.get('id') }}
          />
        </Modal>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  project: React.PropTypes.object,
  comments: React.PropTypes.object,
  currentImage: React.PropTypes.object,
  currentSection: React.PropTypes.object,
  changeSection: React.PropTypes.func,
  fetchProject: React.PropTypes.func,
  updateProject: React.PropTypes.func,
  params: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { changeSection, fetchProject, updateProject, openModal },
    dispatch
  );
}

const mapState = createStructuredSelector({
  comments: selectors.selectComments(),
  project: selectors.selectProject(),
  currentImage: selectors.selectCurrentImage(),
  currentSection: selectCurrentSection(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
