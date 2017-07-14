import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as sections from 'containers/App/constants/sections';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import ProjectInstructions from 'containers/ProjectInstructions';
import ImageManager from 'containers/ImageManager';
import ProjectComponents from 'containers/ProjectComponents';
import ProjectMeasurements from 'containers/ProjectMeasurements';
import Comments from 'containers/Comments';
import Modal from 'components/Modal';
import Header from 'components/Header';
import Collaborators from 'containers/Collaborators';
import Toolbar from './subcomponents/Toolbar';
import Basics from './subcomponents/Basics';
import { selectProject, selectCurrentImage, selectComments } from './selectors';
import { fetchProject } from './actions';
import { IMAGE_PLACEHOLDER } from './constants';

class ProjectManager extends React.PureComponent {
  state = { activeModal: null };

  componentDidMount() {
    const { params } = this.props;
    this.props.fetchProject(params.id);
    this.props.changeSection(sections.Basics);
  }

  render() {
    const { project, currentSection } = this.props;

    let renderedSection;

    switch (currentSection.id) {
      case sections.Components.id:
        renderedSection = <ProjectComponents {...this.props} />;
        break;

      case sections.Measurements.id:
        renderedSection = <ProjectMeasurements {...this.props} />;
        break;

      case sections.Instructions.id:
        renderedSection = <ProjectInstructions {...this.props} />;
        break;

      default:
        renderedSection = <Basics {...this.props} />;
        break;
    }

    return (
      <div>
        <Header />
        <Toolbar
          changeSection={this.props.changeSection}
          currentSection={currentSection}
          parent={this}
        />
        <div className="p2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-3">
                <Comments />
              </div>
              <div className="col-xs-12 col-md-5 flex justify-center">
                {project &&
                  <div className="flex flex-column items-center lh0">
                    <ImageManager
                      maxImages={5}
                      images={project.get('images')}
                      currentImage={this.props.currentImage}
                      placeholder={IMAGE_PLACEHOLDER}
                    />
                  </div>}
              </div>
              <div className="col-xs-12 col-md-4 flex justify-center">
                {project && renderedSection}
              </div>
            </div>
          </div>
        </div>
        {project &&
          <Modal parent={this} modalID="collaborators">
            <header>
              {`Collaborators for ${project.get('name')}`}
            </header>
            <Collaborators
              invitable={{ type: 'Project', id: project.get('id') }}
            />
          </Modal>}
      </div>
    );
  }
}

ProjectManager.propTypes = {
  images: React.PropTypes.object,
  currentImage: React.PropTypes.object,
  project: React.PropTypes.object,
  currentSection: React.PropTypes.object,
  changeSection: React.PropTypes.func,
  fetchProject: React.PropTypes.func,
  params: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ changeSection, fetchProject }, dispatch);
}

const mapState = createStructuredSelector({
  comments: selectComments(),
  project: selectProject(),
  currentSection: selectCurrentSection(),
  currentImage: selectCurrentImage(),
});

export default connect(mapState, mapDispatch)(ProjectManager);
